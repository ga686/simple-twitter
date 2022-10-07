import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(createdDate) {
      if (!createdDate) {
        return '-'
      }
      return moment(createdDate).fromNow()
    },
    fullDate(createdDate) {
      if (!createdDate) {
        return '-'
      }
      const year = moment(createdDate).format('YYYY')
      const month = moment(createdDate).format('MM')
      const date = moment(createdDate).format('DD')
      return year + '年' + month + '月' + date + '日'
    },
    getTime (createdDate)  {
      if (!createdDate) {
        return '-'
      }
      let period = moment(createdDate).format('a') === 'am' ? '早上' : '下午'
      const time = moment(createdDate).format('h:mm')
      return period + time
    }
  }
}
export const emptyImageFilter = {
  filters: {
    emptyImage(src){
      return src || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMmSURBVHgB7ZkJjuIwEEXNDkLA/e/Dhdh3GL1oamQ8Zacc0+oI5UsR3cFO6pd/LTa99Xr9cl+AvvsSdETaho5I29ARaRu+hsjQfRC9Xs+Nx2M3HA6rq9/vV/fA6/Vy9/vdPZ9Pd7vdqot7n8JHiGDwdDp1k8nkn+EhuD8ajaq/GQcul4s7nU4VuVIUEcG42WxWkWgCCHFBhqsEjYmwCsvlsvoMgWSQDp4Wb8uKILkQOANC2+228eo0IhIjQQzgWT41/fMdc8Tw8JncPxwOrgmyiWgkHo+HOx6P1SrUAY9jLJ8Y7j+jRF7ZREIS1+u1MsxfAWQkwc9YCIrxAoyWcYDALwn6rDqCB30SGLPf799I8P1qtXobS2xwL5Qi85nLapzPZ1cCMxHRsG9EKIVUAsD78/n87R4kILDb7VzsnWb7rAN9EsgpJIGhMRICVkZqiSBWR5Cl/846mIhgpGQZZKBlllB2MVD5a436u/qMta6KaZT/crJTmFoHg4G5KFqIiFP8bqAOJiJSxMgsWopdLBbOCoyDeAx859cYrYBqyCKi5XlJsTlIGRc6JUXah8kCDCXAY0GZixhxLc4+SgQ5aJLipdalFxBfSFR7lhZnsW76v/nOCI2INRB9xNItBK1GazARkU42RK6sWIlYBZeNl3bfAhMRaocGq37lGaTuFDTJxd4dwrwiGqxSwBjakDrvklC0uRaYiJTsrZlLY2npbDV5aXLTYCISe1gdQb5n16d5lSwVNpEglJdlj1M9zxVA07QA4zebTZQEDabWSyEvmZOzRykiQgYKDZU6Edt/kyCkS/abUX8+8ZS7Y8yqZrzYlxOG4nU8i4H8j0djksPoUE4UwdDz8twcZG91MSaUlJZtfFA4IRDbcNFfsQolW90sInLMw4sxPuV9OfrB43VpWuSGlGLFtw7ZKyKnIJDBy2hZzq/wuFy57Yb0WtZ0G6LRuRZGIwXI4M2cCh+DFM2m8mqctSQgS486QSrLWVF8iA0RDNFOD1OQNE0K//VDbIHEDU1h6mcFxhEDXKlE0QQf/X1EvJyq+D+F7qe3tqEj0jZ0RNqGjkjb8AfRQBvvkNhhqAAAAABJRU5ErkJggg=='
    }
  }
}

export const accountFilter = {
  filters: {
    account(account){
      return account = '@' + account
    }
  }
}
