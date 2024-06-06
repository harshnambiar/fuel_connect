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



}
window.connect = connect;
