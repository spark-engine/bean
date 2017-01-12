/*global bean:true, buster:true, Syn:true, assert:true, defer:true, features:true, globalSetUp:true, globalTearDown:true*/

buster.testCase('capture', {
  'setUp': globalSetUp
  , 'tearDown': globalTearDown

  , 'when useCapture is true': {
    'setUp': function () {
      var self = this
      this.runTest = function (method) {
        var el = self.byId('input')
          , mock    = self.spy(el, 'addEventListener')
          , spy     = self.spy()
          , trigger = self.trigger()
          , wrapped = trigger.wrap(spy)

        bean[method](el, 'click', wrapped, {useCapture: true})
        assert(mock.getCall(0).args[2], 'should capture')
        bean.off(el, 'click', wrapped, {useCapture: true});
      }
    }
    , 'on()': function () {
      this.runTest('on')
    }
    , 'add()': function () {
      this.runTest('add')
    }
  }

  , 'when useCapture is false': {
    'setUp': function () {
      var self = this
      this.runTest = function (method) {
        var el = self.byId('input')
          , mock    = self.spy(el, 'addEventListener')
          , spy     = self.spy()
          , trigger = self.trigger()
          , wrapped = trigger.wrap(spy)

        bean[method](el, 'click', wrapped, {useCapture: false})
        refute(mock.getCall(0).args[2], 'should not capture')
        bean.off(el, 'click', wrapped, {useCapture: true});
      }
    }
    , 'on()': function () {
      this.runTest('on')
    }
    , 'add()': function () {
      this.runTest('add')
    }
  }

  , 'when useCapture is not given': {
    'setUp': function () {
      var self = this
      this.runTest = function (method) {
        var el = self.byId('input')
          , mock    = self.spy(el, 'addEventListener')
          , spy     = self.spy()
          , trigger = self.trigger()
          , wrapped = trigger.wrap(spy)

        bean[method](el, 'click', wrapped)
        refute(mock.getCall(0).args[2], 'should not capture')
        bean.off(el, 'click', wrapped, {useCapture: true});
      }
    }
    , 'on()': function () {
      this.runTest('on')
    }
    , 'add()': function () {
      this.runTest('add')
    }
  }
})