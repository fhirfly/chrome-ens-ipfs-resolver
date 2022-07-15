/**
 * @file The entry point for the web extension singleton process.
 */

 import MetamaskController, {
   METAMASK_CONTROLLER_EVENTS,
 } from './metamask-controller';

 import setupEnsIpfsResolver from './lib/ens-ipfs/setup';
 
 const initApp = async (remotePort) => {
   browser.runtime.onConnect.removeListener(initApp);
   await initialize(remotePort);
   log.info('ENS Resolver initialization complete.');
 };
 
 if (isManifestV3()) {
   browser.runtime.onConnect.addListener(initApp);
 } else {
   // initialization flow
   initialize().catch(log.error);
 }
   
 /**
  * @property {number} version - The latest migration version that has been run.
  */
 
 /**
  * Initializes the MetaMask controller, and sets up all platform configuration.
  *
  * @param {string} remotePort - remote application port connecting to extension.
  * @returns {Promise} Setup complete.
  */
 async function initialize(remotePort) {
   log.info('ENS Resolver initialization complete.');
 }
 
  /**
  * Initializes the MetaMask Controller with any initial state and default language.
  * Configures platform-specific error reporting strategy.
  * Streams emitted state updates to platform-specific storage strategy.
  * Creates platform listeners for new Dapps/Contexts, and sets up their data connections to the controller.
  *
  * @param {Object} initState - The initial state to start the controller with, matches the state that is emitted from the controller.
  * @param {string} initLangCode - The region code for the language preferred by the current user.
  * @param {string} remoteSourcePort - remote application port connecting to extension.
  * @returns {Promise} After setup is complete.
  */
 function setupController(initState, initLangCode, remoteSourcePort) {
   //
   // MetaMask Controller
   //
 
   const controller = new MetamaskController({
	 infuraProjectId: process.env.INFURA_PROJECT_ID,
	 // User confirmation callbacks:
	 showUserConfirmation: triggerUi,
	 openPopup,
	 // initial state
	 initState,
	 // initial locale code
	 initLangCode,
	 // platform specific api
	 platform,
	 notificationManager,
	 browser,
  });
 
   setupEnsIpfsResolver({
	 getCurrentChainId: controller.networkController.getCurrentChainId.bind(
	   controller.networkController,
	 ),
	 getIpfsGateway: controller.preferencesController.getIpfsGateway.bind(
	   controller.preferencesController,
	 ),
	 provider: controller.provider,
   });
 
 
 
   }
 
   //
   // connect to other contexts
   //
   if (isManifestV3() && remoteSourcePort) {
	 connectRemote(remoteSourcePort);
   }
 
   browser.runtime.onConnect.addListener(connectRemote);
   browser.runtime.onConnectExternal.addListener(connectExternal);
 
   const isClientOpenStatus = () => {
	 return (
	   popupIsOpen ||
	   Boolean(Object.keys(openMetamaskTabsIDs).length) ||
	   notificationIsOpen
	 );
   };
 
  
   // communication with page or other extension
   function connectExternal(remotePort) {
	 const portStream = new PortStream(remotePort);
	 controller.setupUntrustedCommunication({
	   connectionStream: portStream,
	   sender: remotePort.sender,
	 });
   }
 
   
 
  
 
 
 
 
 
