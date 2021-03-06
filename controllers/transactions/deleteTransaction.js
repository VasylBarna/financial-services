const { NotFound, BadRequest } = require('http-errors');
const { User } = require('../../models');
const { Transaction } = require('../../models');

const deleteTransaction = async (req, res) => {
  const { _id, balance } = req.user;
  
  const { transactionId } = req.params;
  const transaction = await Transaction.findOneAndRemove({
    _id: transactionId,
    owner: _id,
  });

  if (!transaction) {
    throw new NotFound(`Transaction with id=${transactionId} not found`);
  }

  const {incomes , costs } = transaction;
  const updatedBalance = incomes === false ? balance + costs : balance - costs;

  if (updatedBalance < 0) {
    throw new BadRequest('There are no enough money for this purchase');
  }

  await User.findByIdAndUpdate(
    { _id },
    { balance: updatedBalance }
  );

  res.status(201).json({
    status: 'succes',
    code: 201,
    data: {
      message: 'Success remove',
      balance: updatedBalance,
    },
  });
};

module.exports = deleteTransaction;
