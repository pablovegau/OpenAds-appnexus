import {expect} from 'chai'
import sinon from 'sinon'
import AstClientImpl from '../../openads-appnexus/AstClientImpl'

describe('AstClient implementation', function () {
  const createLoggerMock = () => ({
    error: () => null,
    debug: () => null
  })
  const createApnTagMock = () => ({
    anq: {
      push: (func) => func()
    },
    debug: false,
    onEvent: () => null,
    defineTag: () => null,
    loadTags: () => null,
    showTag: () => null,
    refresh: () => null,
    modifyTag: () => null
  })
  describe('debugMode method', function () {
    it('should update the apntag debug value to the given value', function () {
      const apnTagMock = createApnTagMock()
      const astClient = new AstClientImpl({apnTag: apnTagMock})
      astClient.debugMode({enabled: true})
      expect(apnTagMock.debug, 'debug value should have been updated').to.be.true
    })
  })
  describe('onEvent method', function () {
    it('should call the apntag onEvent method via anq', function () {
      const loggerMock = createLoggerMock()
      const apnTagMock = createApnTagMock()
      const onEventSpy = sinon.spy(apnTagMock, 'onEvent')
      const anqSpy = sinon.spy(apnTagMock.anq, 'push')
      const astClient = new AstClientImpl({apnTag: apnTagMock, logger: loggerMock})
      const givenParameters = {
        targetId: 'id',
        event: 'THE_EVENT',
        callback: () => null
      }

      astClient.onEvent(givenParameters)

      const expectedUnnamedParameters = [givenParameters.event, givenParameters.targetId, givenParameters.callback]
      expect(anqSpy.calledOnce, 'anq shoud have been called').to.be.true
      expect(onEventSpy.calledOnce, 'onEvent shoud have been called').to.be.true
      expect(onEventSpy.args[0], 'apntag onEvent should receive the parameters in order').to.deep.equal(expectedUnnamedParameters)
    })
  })
  describe('defineTag method', function () {
    it('should call the apntag defineTag method via anq', function () {
      const loggerMock = createLoggerMock()
      const apnTagMock = createApnTagMock()
      const defineTagSpy = sinon.spy(apnTagMock, 'defineTag')
      const anqSpy = sinon.spy(apnTagMock.anq, 'push')
      const astClient = new AstClientImpl({apnTag: apnTagMock, logger: loggerMock})
      const givenParameters = {
        member: '1',
        targetId: '2',
        keywords: {a: '3'},
        invCode: '5',
        sizes: [[6, 7]],
        native: {b: '8'}
      }
      astClient.defineTag(givenParameters)
      expect(anqSpy.calledOnce, 'anq shoud have been called').to.be.true
      expect(defineTagSpy.calledOnce, 'defineTag shoud have been called').to.be.true
      expect(defineTagSpy.args[0][0], 'apntag defineTag should receive the parameters in order').to.deep.equal(givenParameters)
    })
  })
  describe('loadTags method', function () {
    it('should call the apntag loadTags method via anq', function () {
      const loggerMock = createLoggerMock()
      const apnTagMock = createApnTagMock()
      const loadTagsSpy = sinon.spy(apnTagMock, 'loadTags')
      const anqSpy = sinon.spy(apnTagMock.anq, 'push')
      const astClient = new AstClientImpl({apnTag: apnTagMock, logger: loggerMock})
      astClient.loadTags()
      setTimeout(() => {
        expect(anqSpy.calledOnce, 'anq shoud have been called').to.be.true
        expect(loadTagsSpy.calledOnce, 'loadTags shoud have been called').to.be.true
      }, 200)
    })
    it('should call the apntag loadTags method via anq once after several consecutive calls of loadTags AstClient', function () {
      const loggerMock = createLoggerMock()
      const apnTagMock = createApnTagMock()
      const loadTagsSpy = sinon.spy(apnTagMock, 'loadTags')
      const anqSpy = sinon.spy(apnTagMock.anq, 'push')
      const astClient = new AstClientImpl({apnTag: apnTagMock, logger: loggerMock})
      astClient.loadTags()
        .loadTags()
        .loadTags()
        .loadTags()
        .loadTags()
        .loadTags()
        .loadTags()
        .loadTags()
      setTimeout(() => {
        expect(anqSpy.calledOnce, 'anq shoud have been called').to.be.true
        expect(loadTagsSpy.calledOnce, 'loadTags shoud have been called').to.be.true
      }, 200)
    })
    it('should call the apntag loadTags method via anq twice after several consecutive calls of loadTags AstClient', function () {
      const loggerMock = createLoggerMock()
      const apnTagMock = createApnTagMock()
      const loadTagsSpy = sinon.spy(apnTagMock, 'loadTags')
      const anqSpy = sinon.spy(apnTagMock.anq, 'push')
      const astClient = new AstClientImpl({apnTag: apnTagMock, logger: loggerMock})
      astClient.loadTags()
        .loadTags()
        .loadTags()
        .loadTags()
        .loadTags()
        .loadTags()
        .loadTags()
        .loadTags()
      setTimeout(() => {
        astClient.loadTags()
      }, 20)
      setTimeout(() => {
        expect(anqSpy.calledTwice, 'anq shoud have been called').to.be.true
        expect(loadTagsSpy.calledTwice, 'loadTags shoud have been called').to.be.true
      }, 200)
    })
  })
  describe('showTag method', function () {
    it('should call the apntag showTag method via anq', function () {
      const loggerMock = createLoggerMock()
      const apnTagMock = createApnTagMock()
      const showTagSpy = sinon.spy(apnTagMock, 'showTag')
      const anqSpy = sinon.spy(apnTagMock.anq, 'push')
      const astClient = new AstClientImpl({apnTag: apnTagMock, logger: loggerMock})

      const givenParameters = {targetId: 'id'}
      astClient.showTag(givenParameters)
      const expectedUnnamedParameters = [givenParameters.targetId]
      expect(anqSpy.calledOnce, 'anq shoud have been called').to.be.true
      expect(showTagSpy.calledOnce, 'showTag shoud have been called').to.be.true
      expect(showTagSpy.args[0], 'apntag defineTag should receive the parameters in order').to.deep.equal(expectedUnnamedParameters)
    })
  })
  describe('refresh method', function () {
    it('should call the apntag refresh method via anq', function () {
      const loggerMock = createLoggerMock()
      const apnTagMock = createApnTagMock()
      const refreshSpy = sinon.spy(apnTagMock, 'refresh')
      const anqSpy = sinon.spy(apnTagMock.anq, 'push')
      const astClient = new AstClientImpl({apnTag: apnTagMock, logger: loggerMock})

      const givenParameters = ['target1', 'target2']
      astClient.refresh(givenParameters)
      setTimeout(() => {
        expect(anqSpy.calledOnce, 'anq shoud have been called').to.be.true
        expect(refreshSpy.calledOnce, 'refresh shoud have been called').to.be.true
        expect(refreshSpy.args[0][0], 'apntag refresh should receive the parameters in order').to.deep.equal(givenParameters)
      }, 200)
    })

    it('should call the apntag refresh method via anq once after several consecutive calls of refresh AstClient', function () {
      const loggerMock = createLoggerMock()
      const apnTagMock = createApnTagMock()
      const refreshSpy = sinon.spy(apnTagMock, 'refresh')
      const anqSpy = sinon.spy(apnTagMock.anq, 'push')
      const astClient = new AstClientImpl({apnTag: apnTagMock, logger: loggerMock})

      const givenParameters = ['target1', 'target2', 'target3', 'target4', 'target5', 'target6', 'target7', 'target8']

      astClient.refresh(['target1'])
        .refresh(['target2', 'target3'])
        .refresh(['target4'])
        .refresh(['target5'])
        .refresh(['target6'])
        .refresh(['target7'])
        .refresh(['target8'])

      setTimeout(() => {
        expect(anqSpy.calledOnce, 'anq shoud have been called').to.be.true
        expect(refreshSpy.calledOnce, 'refresh shoud have been called').to.be.true
        expect(refreshSpy.args[0][0], 'apntag refresh should receive the parameters in order').to.deep.equal(givenParameters)
      }, 200)
    })

    it('should call the apntag refresh method via anq twice after several consecutive calls of refresh AstClient', function () {
      const loggerMock = createLoggerMock()
      const apnTagMock = createApnTagMock()
      const refreshSpy = sinon.spy(apnTagMock, 'refresh')
      const anqSpy = sinon.spy(apnTagMock.anq, 'push')
      const astClient = new AstClientImpl({apnTag: apnTagMock, logger: loggerMock})

      const givenParametersFirstCall = ['target1', 'target2', 'target3', 'target4', 'target5', 'target6', 'target7', 'target8']
      const givenParametersSecondCall = ['target9']

      astClient.refresh(['target1'])
        .refresh(['target2', 'target3'])
        .refresh(['target4'])
        .refresh(['target5'])
        .refresh(['target6'])
        .refresh(['target7'])
        .refresh(['target8'])

      setTimeout(() => {
        astClient.refresh(['target9'])
      }, 20)

      setTimeout(() => {
        expect(anqSpy.calledOnce, 'anq shoud have been called').to.be.true
        expect(refreshSpy.calledOnce, 'refresh shoud have been called').to.be.true
        expect(refreshSpy.args[0][0], 'apntag refresh should receive the parameters in order').to.deep.equal(givenParametersFirstCall)
        expect(refreshSpy.args[1][0], 'apntag refresh should receive the parameters in order').to.deep.equal(givenParametersSecondCall)
      }, 200)
    })
  })
})