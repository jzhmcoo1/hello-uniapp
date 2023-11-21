class Calendar {
  constructor ({
    date,
    selected,
    startDate,
    endDate,
    range
    // multipleStatus
  } = {}) {
    // 当前日期
    this.date = this.getDate(new Date()) // 当前初入日期
    // 打点信息
    this.selected = selected || []
    // 范围开始
    this.startDate = startDate
    // 范围结束
    this.endDate = endDate
    this.range = range
    // 多选状态
    this.cleanMultipleStatus()
    // 每周日期
    this.weeks = {}
    // this._getWeek(this.date.fullDate)
    // this.multipleStatus = multipleStatus
    this.lastHover = false
  }

  /**
	 * 设置日期
	 * @param {Object} date
	 */
  setDate (date) {
    this.selectDate = this.getDate(date)
    this._getWeek(this.selectDate.fullDate)
  }

  /**
	 * 清理多选状态
	 */
  cleanMultipleStatus () {
    this.multipleStatus = {
      before: '',
      after: '',
      data: []
    }
  }

  /**
	 * 重置开始日期
	 */
  resetSatrtDate (startDate) {
    // 范围开始
    this.startDate = startDate
  }

  /**
	 * 重置结束日期
	 */
  resetEndDate (endDate) {
    // 范围结束
    this.endDate = endDate
  }

  /**
	 * 获取任意时间
	 */
  getDate (date, AddDayCount = 0, str = 'day') {
    if (!date) {
      date = new Date()
    }
    if (typeof date !== 'object') {
      date = date.replace(/-/g, '/')
    }
    const dd = new Date(date)
    switch (str) {
    case 'day':
      dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
      break
    case 'month':
      if (dd.getDate() === 31 && AddDayCount > 0) {
        dd.setDate(dd.getDate() + AddDayCount)
      } else {
        const preMonth = dd.getMonth()
        dd.setMonth(preMonth + AddDayCount) // 获取AddDayCount天后的日期
        const nextMonth = dd.getMonth()
        // 处理 pre 切换月份目标月份为2月没有当前日(30 31) 切换错误问题
        if (AddDayCount < 0 && preMonth !== 0 && nextMonth - preMonth > AddDayCount) {
          dd.setMonth(nextMonth + (nextMonth - preMonth + AddDayCount))
        }
        // 处理 next 切换月份目标月份为2月没有当前日(30 31) 切换错误问题
        if (AddDayCount > 0 && nextMonth - preMonth > AddDayCount) {
          dd.setMonth(nextMonth - (nextMonth - preMonth - AddDayCount))
        }
      }
      break
    case 'year':
      dd.setFullYear(dd.getFullYear() + AddDayCount) // 获取AddDayCount天后的日期
      break
    }
    const y = dd.getFullYear()
    const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
    const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
    return {
      fullDate: y + '-' + m + '-' + d,
      year: y,
      month: m,
      date: d,
      day: dd.getDay()
    }
  }

  /**
	 * 获取上月剩余天数
	 */
  _getLastMonthDays (firstDay, full) {
    const dateArr = []
    for (let i = firstDay; i > 0; i--) {
      const beforeDate = new Date(full.year, full.month - 1, -i + 1).getDate()
      dateArr.push({
        date: beforeDate,
        month: full.month - 1,
        disable: true
      })
    }
    return dateArr
  }

  /**
	 * 获取本月天数
	 */
  _currentMonthDys (dateData, full) {
    const dateArr = []
    const fullDate = this.date.fullDate
    for (let i = 1; i <= dateData; i++) {
      const isinfo = false
      const nowDate = full.year + '-' + (full.month < 10
        ? full.month
        : full.month) + '-' + (i < 10
        ? '0' + i
        : i)
      // 是否今天
      const isDay = fullDate === nowDate
      // 获取打点信息
      const info = this.selected && this.selected.find((item) => {
        if (this.dateEqual(nowDate, item.date)) {
          return item
        }
      })

      // 日期禁用
      let disableBefore = true
      let disableAfter = true
      if (this.startDate) {
        // let dateCompBefore = this.dateCompare(this.startDate, fullDate)
        // disableBefore = this.dateCompare(dateCompBefore ? this.startDate : fullDate, nowDate)
        disableBefore = this.dateCompare(this.startDate, nowDate)
      }

      if (this.endDate) {
        // let dateCompAfter = this.dateCompare(fullDate, this.endDate)
        // disableAfter = this.dateCompare(nowDate, dateCompAfter ? this.endDate : fullDate)
        disableAfter = this.dateCompare(nowDate, this.endDate)
      }
      const multiples = this.multipleStatus.data
      let checked = false
      let multiplesStatus = -1
      if (this.range) {
        if (multiples) {
          multiplesStatus = multiples.findIndex((item) => {
            return this.dateEqual(item, nowDate)
          })
        }
        if (multiplesStatus !== -1) {
          checked = true
        }
      }
      const data = {
        fullDate: nowDate,
        year: full.year,
        date: i,
        multiple: this.range ? checked : false,
        beforeMultiple: this.isLogicBefore(nowDate, this.multipleStatus.before, this.multipleStatus.after),
        afterMultiple: this.isLogicAfter(nowDate, this.multipleStatus.before, this.multipleStatus.after),
        month: full.month,
        disable: !(disableBefore && disableAfter),
        isDay,
        userChecked: false
      }
      if (info) {
        data.extraInfo = info
      }

      dateArr.push(data)
    }
    return dateArr
  }

  /**
	 * 获取下月天数
	 */
  _getNextMonthDays (surplus, full) {
    const dateArr = []
    for (let i = 1; i < surplus + 1; i++) {
      dateArr.push({
        date: i,
        month: Number(full.month) + 1,
        disable: true
      })
    }
    return dateArr
  }

  /**
	 * 获取当前日期详情
	 * @param {Object} date
	 */
  getInfo (date) {
    if (!date) {
      date = new Date()
    }
    const dateInfo = this.canlender.find(item => item.fullDate === this.getDate(date).fullDate)
    return dateInfo
  }

  /**
	 * 比较时间大小
	 */
  dateCompare (startDate, endDate) {
    // 计算截止时间
    startDate = new Date(startDate.replace('-', '/').replace('-', '/'))
    // 计算详细项的截止时间
    endDate = new Date(endDate.replace('-', '/').replace('-', '/'))
    if (startDate <= endDate) {
      return true
    } else {
      return false
    }
  }

  /**
	 * 比较时间是否相等
	 */
  dateEqual (before, after) {
    // 计算截止时间
    before = new Date(before.replace('-', '/').replace('-', '/'))
    // 计算详细项的截止时间
    after = new Date(after.replace('-', '/').replace('-', '/'))
    if (before.getTime() - after.getTime() === 0) {
      return true
    } else {
      return false
    }
  }

  /**
	 *  比较真实起始日期
	 */

  isLogicBefore (currentDay, before, after) {
    let logicBefore = before
    if (before && after) {
      logicBefore = this.dateCompare(before, after) ? before : after
    }
    return this.dateEqual(logicBefore, currentDay)
  }

  isLogicAfter (currentDay, before, after) {
    let logicAfter = after
    if (before && after) {
      logicAfter = this.dateCompare(before, after) ? after : before
    }
    return this.dateEqual(logicAfter, currentDay)
  }

  /**
	 * 获取日期范围内所有日期
	 * @param {Object} begin
	 * @param {Object} end
	 */
  geDateAll (begin, end) {
    const arr = []
    const ab = begin.split('-')
    const ae = end.split('-')
    const db = new Date()
    db.setFullYear(ab[0], ab[1] - 1, ab[2])
    const de = new Date()
    de.setFullYear(ae[0], ae[1] - 1, ae[2])
    const unixDb = db.getTime() - 24 * 60 * 60 * 1000
    const unixDe = de.getTime() - 24 * 60 * 60 * 1000
    for (let k = unixDb; k <= unixDe;) {
      k = k + 24 * 60 * 60 * 1000
      arr.push(this.getDate(new Date(parseInt(k))).fullDate)
    }
    return arr
  }

  /**
	 *  获取多选状态
	 */
  setMultiple (fullDate) {
    const {
      before,
      after
    } = this.multipleStatus
    if (!this.range) return
    if (before && after) {
      if (!this.lastHover) {
        this.lastHover = true
        return
      }
      this.multipleStatus.before = fullDate
      this.multipleStatus.after = ''
      this.multipleStatus.data = []
      this.multipleStatus.fulldate = ''
      this.lastHover = false
    } else {
      if (!before) {
        this.multipleStatus.before = fullDate
        this.lastHover = false
      } else {
        this.multipleStatus.after = fullDate
        if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus
            .after)
        } else {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus
            .before)
        }
        this.lastHover = true
      }
    }
    this._getWeek(fullDate)
  }

  /**
	 *  鼠标 hover 更新多选状态
	 */
  setHoverMultiple (fullDate) {
    const {
      before,
      after
    } = this.multipleStatus

    if (!this.range) return
    if (this.lastHover) return

    if (!before) {
      this.multipleStatus.before = fullDate
    } else {
      this.multipleStatus.after = fullDate
      if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
        this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after)
      } else {
        this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before)
      }
    }
    this._getWeek(fullDate)
  }

  /**
	 * 更新默认值多选状态
	 */
  setDefaultMultiple (before, after) {
    this.multipleStatus.before = before
    this.multipleStatus.after = after
    if (before && after) {
      if (this.dateCompare(before, after)) {
        this.multipleStatus.data = this.geDateAll(before, after)
        this._getWeek(after)
      } else {
        this.multipleStatus.data = this.geDateAll(after, before)
        this._getWeek(before)
      }
    }
  }

  /**
	 * 获取每周数据
	 * @param {Object} dateData
	 */
  _getWeek (dateData) {
    const {
      fullDate,
      year,
      month,
      date,
      day
    } = this.getDate(dateData)
    const firstDay = new Date(year, month - 1, 1).getDay()
    const currentDay = new Date(year, month, 0).getDate()
    const dates = {
      lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)), // 上个月末尾几天
      currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)), // 本月天数
      nextMonthDays: [], // 下个月开始几天
      weeks: []
    }
    let canlender = []
    const surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length)
    dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData))
    canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays)
    const weeks = {}
    // 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
    for (let i = 0; i < canlender.length; i++) {
      if (i % 7 === 0) {
        weeks[parseInt(i / 7)] = new Array(7)
      }
      weeks[parseInt(i / 7)][i % 7] = canlender[i]
    }
    this.canlender = canlender
    this.weeks = weeks
  }

  // 静态方法
  // static init(date) {
  // 	if (!this.instance) {
  // 		this.instance = new Calendar(date);
  // 	}
  // 	return this.instance;
  // }
}

export default Calendar
