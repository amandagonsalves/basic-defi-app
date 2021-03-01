const DaiToken = artifacts.require('DaiToken');
const DappToken = artifacts.require('DappToken');
const TokenFarm = artifacts.require('TokenFarm');

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed();
  console.log(tokenFarm)

  // transfer 1 million token from dappToken to tokenFarm
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000');

  // transfer 100 mDai tokens to investor, the 2nd account
  await daiToken.transfer(accounts[1], '100000000000000000000');
}