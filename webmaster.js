function getPropertiesWebmaster() {
  
  //var properties = PropertiesService.getScriptProperties().getProperties();
  //return properties.getProperties();
  return [AllPropsWithDigitsWebmaster,properties.getProperties()];
}
function isWebmaster() {
  // Recuperiamo l'utente direttamente all'interno della funzione
  var email = Session.getActiveUser().getEmail().toLowerCase();
  var userHandle = email.split('@')[0];
  
  // Usiamo un array pulito
  var admins = "webmasterriccardo.fantonistefano.gugole";
  
  //indexOf restituisce -1 se non trova nulla, altrimenti la posizione
  return admins.includes(user);
}

function getManutenzione()
{
  var properties=PropertiesService.getScriptProperties();
  return JSON.parse(properties.getProperty("AAA_Manutenzione")).n;
}