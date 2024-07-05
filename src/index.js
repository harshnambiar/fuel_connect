import { Wallet } from 'fuels';
import { Fuel, FuelWalletConnector, FueletWalletConnector } from '@fuel-wallet/sdk';

async function connect(code) {
    const fuel = new Fuel({
        connectors: [
          new FueletWalletConnector(),
          new FuelWalletConnector(),
        ],
      });
      console.log(code);
    const connectors = await fuel.connectors();
    console.log("available connectors", connectors);
    const connectorName = code;
    const isSelected = await fuel.selectConnector(connectorName);
    console.log("isSelected", isSelected);
    const connectionState = await fuel.connect();
    console.log("connectionState", connectionState);
    //const hasConnector = await fuel.hasConnector();
    //console.log("hasConnector", hasConnector);

    const accounts = await fuel.accounts();
    console.log("Accounts", accounts);
    const wallet = Wallet.fromAddress(accounts[0].toString());
    const evmWallet = wallet.address.toB256();
    console.log(evmWallet);
    const account = await fuel.currentAccount();
    if (!account) {
      throw new Error("Current account not authorized for this connection!");
    }
    const wallet1 = await fuel.getWallet(account);
    const amount = 1;
    const destination = '0x19a0cef7d3e389890590bd41ddca75e834a267a15a8ea5ac03f4e45006378200';
    const transactionRequest = await wallet1.createTransfer(destination, amount);
    const transactionId = await fuel.sendTransaction(account, transactionRequest);
    console.log("Transaction ID", transactionId);



}
window.connect = connect;
