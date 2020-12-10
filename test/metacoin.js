const MetaCoin = artifacts.require("MetaCoin");
const ConvertLib = artifacts.require("ConvertLib");

contract('MetaCoin', (accounts) => {

  const createMetacoin = async () => {
    const lib = await ConvertLib.deployed();
    MetaCoin.link(ConvertLib, lib.address);
    const metaCoinIntsance = await MetaCoin.new();

    console.log('MetacoinInstance : ' + metaCoinIntsance.address);
    return metaCoinIntsance;
  }

  it('should put 10000 MetaCoin in the first account', async () => {
    const metaCoinInstance = await createMetacoin();
    const balance = await metaCoinInstance.getBalance.call(accounts[0]);

    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });

  it('should call a function that depends on a linked library', async () => {
    const metaCoinInstance = await createMetacoin();
    const metaCoinBalance = (await metaCoinInstance.getBalance.call(accounts[0])).toNumber();
    const metaCoinEthBalance = (await metaCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

    assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  });
});
