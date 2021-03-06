/**
 * @file controller/txs.js
 * @author hzz780
 * 2020.03
 */

const { Controller } = require('egg');
const formatOutput = require('../utils/formatOutput.js');

module.exports = class LotteryController extends Controller {

  async getBoughtLotteries() {
    const { ctx } = this;
    try {
      const { owner } = ctx.request.query;
      const keysRule = {
        owner: 'string'
      };
      const options = {
        owner
      };
      ctx.validate(keysRule, options);

      const result = await ctx.service.lottery.getBoughtLotteries(options);
      formatOutput(ctx, 'get', result);
    } catch (error) {
      formatOutput(ctx, 'error', error, 422);
    }
  }
};
