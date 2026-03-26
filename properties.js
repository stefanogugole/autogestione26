// Properties


/*

Salvo i nomi dei corsi come Properties seguiti da digit 1-2-3-4, a seconda dell'ora che occupa.
- I corsi con due digits  durano entrambe, iscrizione unica -> FORZA IL SECONDO MENU.
    Creo il check se ha 2 digits, else ne ha una.
- Controllo sul tipo di corso: da implementare lato client (popolare il menu) o backend?
- 


*/



function creaProprietaAlunni(key = "ALUNNI", valore = "") {  
  // 1. RECUPERO DATI ESISTENTI
  // Leggiamo se esiste già qualcosa sotto questa 'key'
  
  properties.setProperty(key, JSON.stringify(valore));
  
  Logger.log("ALUNNI aggiornato con successo!");
  //return cleanObject; // Opzionale: torna l'oggetto all'HTML Service
}

function creaProprieta(key = "AAA_Manutenzione", valore = 0, tipo = "F", nuoviElementi = []) {  
  // 1. RECUPERO DATI ESISTENTI
  // Leggiamo se esiste già qualcosa sotto questa 'key'
  const dataEsistenteRaw = properties.getProperty(key);
  let listaInMemoria = [];

  if (dataEsistenteRaw) {
    try {
      const oggettoRecuperato = JSON.parse(dataEsistenteRaw);
      // Se l'oggetto ha già una lista 'i', la carichiamo
      if (oggettoRecuperato && Array.isArray(oggettoRecuperato.i)) {
        listaInMemoria = oggettoRecuperato.i;
      }
    } catch (e) {
      Logger.log("Errore nel parsing dei dati precedenti, inizializzo lista vuota.");
    }
  }

  // 2. UNIONE DEI DATI (MERGE)
  // Aggiungiamo i nuovi elementi (singola stringa o array) alla lista esistente
  if (Array.isArray(nuoviElementi)) {
    listaInMemoria = listaInMemoria.concat(nuoviElementi);
  } else if (typeof nuoviElementi === "string" && nuoviElementi.trim() !== "") {
    listaInMemoria.push(nuoviElementi);
  }

  // 3. CREAZIONE DEL NUOVO OGGETTO PULITO
  const cleanObject = {
    n: Number(valore), 
    t: String(tipo).trim(),
    i: listaInMemoria // Qui ora ci sono sia i vecchi che i nuovi dati
  };

  // 4. SALVATAGGIO
  // Usiamo setProperty che sovrascrive la chiave intera con l'oggetto aggiornato
  properties.setProperty(key, JSON.stringify(cleanObject));
  
  Logger.log("Aggiornato con successo! Totale elementi in 'i': " + JSON.parse(properties.getProperty(key)).i);
  //return cleanObject; // Opzionale: torna l'oggetto all'HTML Service
}

function adminUpdateSeats(nomeAttivita,newSeats) {
  const lock = LockService.getScriptLock();
  
  try {
    // Tenta di acquisire il lock per 10 secondi
    lock.waitLock(20000); 
    
    creaProprieta(nomeAttivita,newSeats,nomeAttivita[0],[]);

    
    console.log("Aggiornamento completato con successo: "+nomeAttivita+": "+newSeats);
  } catch (e) {
    // Se dopo 20 secondi è ancora bloccato, fallisce qui
    console.error("Impossibile aggiornare posti corso "+nomeAttivita+" con valore "+newSeats+": il sistema è occupato da altre operazioni.");
    throw "Server occupato, riprova tra poco.";
  } finally {
    // Rilascia sempre il lock, qualunque cosa succeda
    lock.releaseLock();
  }
}


function adminUpdateSeatsAlunni(nomeAttivita,newSeats) {
  const lock = LockService.getScriptLock();
  
  try {
    // Tenta di acquisire il lock per 10 secondi
    lock.waitLock(20000); 
    
    creaProprietaAlunni(nomeAttivita,newSeats);

    
    console.log("Aggiornamento completato con successo: "+nomeAttivita);
  } catch (e) {
    // Se dopo 20 secondi è ancora bloccato, fallisce qui
    console.error("Impossibile aggiornare posti corso "+nomeAttivita+" con valore "+newSeats+": il sistema è occupato da altre operazioni.");
    throw "Server occupato, riprova tra poco.";
  } finally {
    // Rilascia sempre il lock, qualunque cosa succeda
    lock.releaseLock();
  }
}



function leggiProprieta(keyDaLeggere="AAA_Manutenzione"){  //forse questa serve solo lato html service per riempire il menu
  
  Logger.log("Contenuto grezzo nella property: " + properties.getProperty(keyDaLeggere));
  return properties.getProperty(keyDaLeggere);  //parte la stringa, c'è bisogno di un JSON.parse e di chiamare .n o .t o .i
  
  //Logger.log("Contenuto grezzo nella property: " + prop);
  
  /*
  if (prop) {
    const tmp = JSON.parse(prop);
    Logger.log("Posti (n): " + tmp.n);
    stringa=tmp.n; 
    Logger.log("Tipo (t): " + tmp.t);
  } else {
    Logger.log("ERRORE: Nessun dato trovato per la chiave: " + keyDaLeggere);
  }*/
  
}

function leggiTipo(keyDaLeggere="D-TorneoBasket4")    //inutile, basta il carattere [0 della stringa]
{
    //JSON.parse(properties.getProperty(keyDaLeggere)).t;
   return keyDaLeggere[0];
}


function creaPropsDaFoglio()  ////deve esserci il corso AAA-Manutenzione, con numero utenti 0-1
{
  var ss = SpreadsheetApp.openById(idFoglioBiennio).getSheetByName(nomeFoglioAttivita);  
  var data = ss.getDataRange().getValues();
  for (let i=2; i<data.length; i++)    
    {
      if (data[i][0]) 
      {
        creaProprieta(data[i][0],data[i][1],data[i][2],data[i][3]);
        Logger.log("Creato corso "+data[i][0]+data[i][1]+data[i][2]+data[i][3]);
      }
    }
}

/*
function rimuoviTutteProprieta()
{
  let properties = PropertiesService.getScriptProperties();
  properties.deleteAllProperties()
  Logger.log("rimosso");
}

*/


/*




*/


function getAllPositiveProps()
{
  //let props=JSON.parse(JSON.stringify(PropertiesService.getScriptProperties().getProperties()));
  let props=JSON.parse(JSON.stringify(properties.getProperties()));
  
  let keys=[];
  
 
  let pattern="\\d$";
  let regex=new RegExp(pattern,"i");

  for (key in props)
  {

    //Logger.log("Siamo appena dentro for each: "+key);
    
    if (regex.test(key))    //evito la alunni, voglio solo corsi
    {  
      //Logger.log("Siamo nel for, primo if"+ JSON.parse(props[key]).n);
      if (JSON.parse(props[key]).n>0)
      {
        
        //Logger.log("Siamo nel for, dentro 2 if "+key);
        
        keys.push(key); //sta memorizzando gli indici sulle prop
      
      }
    } 
    
  }

/*
  for (key in keys) //scorre sugli indici numerici, non sulle chiavi in keys
  {
    Logger.log(keys[key]);
    //Logger.log(key.toString()+"\n"); //NOOOOOOOOO, ti da gli indici

  }
*/

  //Logger.log("lancio il return");

  
  return keys.sort(); //Scorri con un for each ma ti da gli indici

}

function getAllProps()
{
  //let props=JSON.parse(JSON.stringify(PropertiesService.getScriptProperties().getProperties()));
  let props=JSON.parse(JSON.stringify(properties.getProperties()));
  
  let keys=[];
  
 
  let pattern="\\d$";
  let regex=new RegExp(pattern,"i");

  for (key in props)
  {

    //Logger.log("Siamo appena dentro for each: "+key);
    
    

    if (regex.test(key))    //evito la alunni, voglio solo corsi
    {  
      
        keys.push(key); //sta memorizzando gli indici sulle prop
      
      
    } 
    
  }

 
  return keys.sort(); //Scorri con un for each ma ti da gli indici

}

function leggiTutteProprieta()//E SCRIVI SU FOGLIO DI CALCOLO
{
  let props=JSON.parse(JSON.stringify(PropertiesService.getScriptProperties().getProperties()));
  var ss = SpreadsheetApp.openById(idFoglioBiennio).getSheetByName("StatoAttivitaBiennio");  
  
   var dati = []; 

  let pattern="\\d$";
  let regex=new RegExp(pattern,"i");
  

  for (key in props)
  {
    Logger.log("Sono nel for, elenco le key: "+key);
    if (regex.test(key))  //non voglio ALUNNI, solo corsi
    { 
      //Logger.log(key+","+JSON.parse(props[key]).n>0);
      dati.push([key, JSON.parse(props[key]).n, JSON.parse(props[key]).i]); //pusho più dati
    }


  }
  if (dati.length > 0) {
    var range = ss.getRange(1, 1, dati.length, 3); // Definisci l'intervallo in cui scrivere i dati
    range.setValues(dati); // Scrivi i dati nel foglio
  } else {
    Logger.log("L'oggetto properties è vuoto.");
  }


    
    
}




function getPropsWithDigit(digit="1") {
  var allProps = PropertiesService.getScriptProperties().getProperties();
  var keys = Object.keys(allProps);
  var filteredKeys = [];
  
  // Regex per trovare il digit alla fine o penultimo posto
  var pattern = digit + "$|" + digit + ".$";
  var regex = new RegExp(pattern, "i");

  keys.forEach(function(key) {
    if (regex.test(key)) {
      try {
        var data = JSON.parse(allProps[key]);
        // Controlla se l'oggetto ha la proprietà 'n' (posti residui)
        if (data && data.n > 0) {
          filteredKeys.push(key);
        }
      } catch (e) {
        // Se la property non è un JSON (magari è lo stato manutenzione), ignora
      }
    }
  });

  return filteredKeys.sort();
}

/*
function getPropsWithDigit(digit="2") // con value>0, per popolare i menu
{
  let pattern="";
  let keys=[];


  pattern=""+digit+"$|"+digit+"(.)$";
  
  let regex=new RegExp(pattern,"i");
  AllPropsWithDigits.forEach((elemento, indice) => {
    
    if (regex.test(elemento))
    {
      keys.push(elemento);
    }
    
    });
  
  
  //Logger.log(keys);
  return keys.sort();

}
*/



function getPropsWithoutDigits() // con value>0, per popolare i menu
{
  var properties = PropertiesService.getScriptProperties().getProperties();
  var data = [];
  var regex = /\d$|\d(.)$/;

  for (var key in properties) {
    if (!regex.test(key)) {
      data.push({
        chiave: key,
        valore: properties[key]
      });
    }
  }
  
  // Ordina in ordine alfabetico per chiave
  data.sort(function(a, b) {
    return a.chiave.localeCompare(b.chiave);
  });

  return data;
}



/*///////////////////////////
///////////////////////////*/




function rimuoviProprieta(key="stefano.gugole")
{
 try {
    properties.deleteProperty(key);
    Logger.log("Proprietà '" + key + "' eliminata con successo.");
  } catch(e) {
    throw new Error("Errore durante l'eliminazione: " + e.message);
  }
}


/*
function calaProprieta(key)
{
  let prop=PropertiesService.getScriptProperties();
  let val=parseInt(prop.getProperty(key));
  if (val>1)
  {
    prop.setProperty(key, ""+val-1)
  }
  Logger.log(""+val-1);
  //sendEmailFromWeb(key+" "+Session.getActiveUser().getEmail());

}
*/


// fine properties





/*
function caricaUtentiBiennio()
{
  var ss = SpreadsheetApp.openById("1KdklbnfF_SB5X169n2lCuNekBx_1Lu65UJbDPd1Cnjk").getSheetByName("Alunni12");  
  var data = ss.getDataRange().getValues();
  //Logger.log(data[0][1]);
  creaProprieta("ALUNNI","riccardo.fantoniwebmaster"+data[0][1]+"stefano.gugole".toString());

}
*/


/*
function caricaUtentiMin()
{
  
  //Logger.log(data[0][1]);
  properties.setProperty("ALUNNI","riccardo.fantoniwebmasterstefano.gugolealessandro.migliorini".toString());

}
*/

/*
function caricaUtentiTriennio() 
{
  var ss = SpreadsheetApp.openById("1KdklbnfF_SB5X169n2lCuNekBx_1Lu65UJbDPd1Cnjk").getSheetByName("Alunni345");  
  var data = ss.getDataRange().getValues();
  //Logger.log(data[0][1]);
  creaProprieta("ALUNNI","riccardo.fantoniwebmaster"+data[0][1]+"stefano.gugole".toString());

}
*/








