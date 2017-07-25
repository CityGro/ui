<template>
  <div class="ui-table">
    <div class="ui-table-left">
      <div class="ui-table-left-header">
        <slot name="left-fixed-header" />
      </div>
      <div class="ui-table-left-content">
        <slot name="left-fixed-content" />
      </div>
    </div>
    <div class="ui-table-center">
      <div class="ui-table-center-header">
        <slot name="center-header" />
      </div>
      <div class="ui-table-center-content">
        <slot name="center-content" />
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  methods: {
    /**
     * calculate and set the max width of every cell
     * @param self
     */
    calculateWidths () {
      clearTimeout(this.calcTimeout)
      this.calcTimeout = setTimeout(() => {
        // Save current left scroll amount and restore it
        const currentScrollLeft = this.uiTableCenterContent.scrollLeft() || 0

        this.uiTable.find('th, td').css('max-width', 'auto').css('min-width', 'auto')
        if (this.uiTableLeft) {
          let maxWidth = 0
          this.uiTableLeft.find('th, td').each((i, el) => {
            maxWidth = $(el).outerWidth() > maxWidth ? $(el).outerWidth() : maxWidth
          })
          /*
          this.uiTableCenterHeader.css('margin-left', maxWidth + 'px')
          this.uiTableCenterContent.css('margin-left', maxWidth + 'px')
          */
        }

        // Get the max width of the headers first
        let maxWidths = []
        this.uiTableCenterHeader.find('th').each((i, col) => {
          maxWidths.push($(col).outerWidth())
        })

        // If any of the rows' column widths are greater than their respective headers, use that
        this.uiTableCenterContent.find('tr:eq(0) td').each((i, col) => {
          col = $(col)
          if (!maxWidths[i] || col.outerWidth() > maxWidths[i]) {
            maxWidths[i] = col.outerWidth()
          }
        })

        maxWidths.forEach((width, i) => {
          if (width > 300) {
            width = 300
          }
          this.uiTableCenterHeader.find('th:eq(' + i + ')').css('min-width', width + 'px').css('max-width', width + 'px')
          this.uiTableCenterContent.find('tr:eq(0) td:eq(' + i + ')').css('min-width', width + 'px').css('max-width', width + 'px')
        })

        // Set heights of all rows
        this.uiTable.find('td').css('height', 'auto')
        let maxHeights = []

        this.uiTableLeftTable.find('td').each((i, col) => {
          maxHeights.push($(col).outerHeight())
        })

        this.uiTableCenterContent.find('tr').find('td:eq(0)').each((i, col) => {
          if (!maxHeights[i] || $(col).outerHeight() > maxHeights[i]) {
            maxHeights[i] = $(col).outerHeight()
          }
          $(col).outerHeight(maxHeights[i])
        })

        maxHeights.forEach((height, i) => {
          this.uiTableLeftTable.find('tr:eq(' + i + ') td:eq(0)').each((j, col) => {
            $(col).outerHeight(maxHeights[i])
          })
        })
        this.uiTableCenterContent.scrollLeft(currentScrollLeft)

        if (this.uiTableLeftTable) {
          // self.uiTableLeftTable.css('margin-top', (-1 * this.scrollTop) + 'px')
          this.uiTableLeftContent.scrollTop(this.uiTableCenterContent.scrollTop())
          if (this.uiTableCenterContent.scrollLeft() > 1) {
            this.uiTableLeft.addClass('ui-scrolled-x')
          } else {
            this.uiTableLeft.removeClass('ui-scrolled-x')
          }
        }
      }, 300)
    }
  },
  mounted () {
    this.uiTable = $(this.$el)
    this.uiTableCenterContent = this.uiTable.find('.ui-table-center-content')
    this.uiTableCenterHeader = this.uiTable.find('.ui-table-center-header')
    this.uiTableCenterHeaderTable = this.uiTable.find('.ui-table-center-header table')
    this.uiTableLeft = this.uiTable.find('.ui-table-left')
    this.uiTableLeftContent = this.uiTable.find('.ui-table-left .ui-table-left-content')
    this.uiTableLeftTable = this.uiTable.find('.ui-table-left .ui-table-left-content table')

    /*
     * Set up the scroll watcher to adjust the position of the header/sider as scrolling happens
     */
    this.uiTableCenterContent.off('scroll').on('scroll', (evt) => {
      if (this.uiTableCenterHeaderTable) {
        this.uiTableCenterHeaderTable.css('margin-left', (-1 * evt.target.scrollLeft) + 'px')
        if (evt.target.scrollTop > 1) {
          this.uiTableCenterHeader.addClass('ui-scrolled-y')
          if (this.uiTableLeft) {
            this.uiTableLeft.addClass('ui-scrolled-y')
          }
        } else {
          this.uiTableCenterHeader.removeClass('ui-scrolled-y')
          if (this.uiTableLeft) {
            this.uiTableLeft.removeClass('ui-scrolled-y')
          }
        }
      }
      if (this.uiTableLeftTable) {
        // self.uiTableLeftTable.css('margin-top', (-1 * this.scrollTop) + 'px')
        this.uiTableLeftContent.scrollTop(evt.target.scrollTop)
        if (evt.target.scrollLeft > 1) {
          this.uiTableLeft.addClass('ui-scrolled-x')
        } else {
          this.uiTableLeft.removeClass('ui-scrolled-x')
        }
      }
    })

    this.uiTableLeftContent.off('mousewheel').on('mousewheel', (evt) => {
      this.uiTableLeftContent.scrollTop(this.uiTableLeftContent.scrollTop() * 1 - evt.originalEvent.wheelDelta)
      if (this.uiTableCenterContent) {
        // self.uiTableCenterContent.css('margin-top', (-1 * this.scrollTop) + 'px')
        this.uiTableCenterContent.scrollTop(this.uiTableLeftContent.scrollTop())
      }
    })

    setTimeout(() => {
      this.uiTable.trigger('DOMCharacterDataModified')
    }, 30)
    this.uiTable.on('DOMCharacterDataModified', () => {
      this.calculateWidths()
    })
    this.uiTable.on('DOMNodeInserted', () => {
      this.calculateWidths()
    })
    this.uiTable.on('DOMNodeRemoved', () => {
      this.calculateWidths()
    })

    this.$el.cgWindowResize = () => {
      this.calculateWidths()
    }
    $(window).on('resize', this.$el.cgWindowResize)
  },
  beforeDestroy () {
    $(this.$el).find('.ui-table-center-content').off('scroll')
    $(this.$el).off('DOMCharacterDataModified')
    $(this.$el).off('DOMNodeInserted')
    $(this.$el).off('DOMNodeRemoved')
    $(window).off('resize', this.$el.cgWindowResize)
  }
}
</script>

<style lang="scss">
.ui-table {
  border: 1px solid $gray-lighter;
  border-radius: 5px;
  opacity: 1;
  transition: opacity 0.3s linear;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  table {
    border: 0;
    margin-bottom: 0;
    width: auto;

    tr, td {
      white-space: nowrap;
    }
  }

  .ui-table-left {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
    height: 100%;
    background-color: $component-active-color;

    table {
      border-right: 0;
      min-width: 100%;
    }

    &.ui-scrolled-x {
      table {
        border-right: 1px solid $gray-lighter;
      }
    }

    &.ui-scrolled-y {
      th {
        border-bottom: 1px solid $gray-lighter;
      }
    }

    .ui-table-left-header {
      table {
        margin-bottom: 0;
        min-width: 100%;
      }
    }

    .ui-table-left-content {
      overflow: hidden;
      flex: 1;
    }
  }

  .ui-table-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /*
    .ui-table-left + .ui-table-header {
      table {
        border-left: 0;
      }
    }
    */

    .ui-table-center-header {
      table {
        margin-bottom: 0;
        min-width: 100%;
      }

      &.ui-scrolled-y {
        th {
          border-bottom: 1px solid $gray-lighter;
        }
      }
    }

    .ui-table-center-content {
      overflow-y: auto;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      flex: 1;
      table {
        min-width: 100%;
        thead {
          th {
            padding-top: 0;
            padding-bottom: 0;
            i {
              line-height: 0;
            }
          }
        }
        margin-bottom: 0;
      }
    }
    /*
    .ui-table-left + .ui-table-center-header + .ui-table-center-content, .ui-table-left + .ui-table-content {
      table {
        border-left: 0;
      }
    }

    .ui-table-header + .ui-table-center-content, .ui-table-header + .ui-table-sider + .ui-table-center-content {
      height: calc(100% - 45px);
    }
    */
  }
}
</style>
