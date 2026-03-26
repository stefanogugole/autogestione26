/*
Bisogna controllare che un utente entri solo una volta. Controllo prop o fogli?
*/

function doGet() {
  var user = Session.getActiveUser().getEmail().toLowerCase().split('@')[0];
  
  if (getUsers().includes(user)) {
  
    var properties=PropertiesService.getScriptProperties();
    var template = HtmlService.createTemplateFromFile('Index');
    template.user = user;
    template.isManutenzione = getManutenzione() ? 1 : 0;
    template.isAdmin = isWebmaster();
    template.compilato = false;
    template.corsi = "[]";        // Default: array vuoto in formato stringa
    template.primoSelect = "[]";  // Default: array vuoto in formato stringa
    
    if (testUser()) {
      template.compilato = true;
      var corsiSalvati = properties.getProperty(getUser());
      template.corsi = corsiSalvati ? corsiSalvati : "[]";
    } 
    else {
      template.compilato = false;
      try {
        var datiCorsi = getPropsWithDigit(digit="1");
        template.primoSelect = JSON.stringify(datiCorsi);
      } catch (e) {
        template.primoSelect = "[]";
      }
    }


    return template.evaluate()
      .setTitle("Iscrizioni Autogestione '26")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } 
  else {
    return HtmlService.createHtmlOutput("Accesso negato per " + Session.getActiveUser().getEmail());
  }
}
  

var user=getUser();
  /*return HtmlService.createHtmlOutputFromFile('Index');


/*
function prova3()
{
  let user = Session.getActiveUser().getEmail().split('@')[0];
  Logger.log(user);
}
*/

//var utentiDaIscrivere=[];
//NOOOOO DEVE ESSERE UNA PROPERTY SENNO' SI RESETTA A OGNI ACCESSO  //let sitoAperto=1; //avanti tutta con 1, fai manutenzione con 0
let idFoglioBiennio="1V3xpjrg4cCP5aU_2DnBFo-jcv9ZRxTn2ka8A3a4cNPo";
let nomeFoglioAttivita="Attivita26";
var properties=PropertiesService.getScriptProperties();
//var users=properties.getProperty("ALUNNI");




function getUsers()
{
  return "tmpstefano.gugolestefano.gugolewebmasterriccardo.fantonimila.bolticmanila.burzottapaolo.coppolagiacomo.dalcorsolorenzo.dantecostanza.federicogiacomo.frangionizhengandrea.liuglorialucrezia.marocchiofederico.mazzolaalessio.melottidavide.mohamedmaieumberto.pasigiulietta.pedrazzanirossella.petrucciemmavittoria.prandofrancesco.pratianna.riccigiulia.rovagliagiuseppe.sartorigiorgia.scardonialice.silvestrirachele.trestinoleonardo.trevisanialessandro.truzzolialessandro.zambanelloalessandro.amainiserena.babbiroberto.baldangianluca.barbiratomartina.boyance'matteo.campanellalivia.cesolinirachele.dall'eralorenzo.epissheyaramethusi.fernandomuthunamagonnagebianca.ferroniemma.ischiamatteo.magalinimiriam.melisisara.melottogiulia.mirabilesara.modenaviola.muccianteelisa.nuzzoleonardo.ollaluca.petrolinosofia.rudellaelia.seghettidaniel.sierraperezedoardo.testigreta.venturiniqianyue.wangraul.baldosebastiano.bampafulvio.bonanomifedericosalvatore.cappagiacomo.castagnaedoardo.cavalierielia.crivellarolorenzo.digigliogiulia.filippinisamuele.franchigreta.giacopuzzifrancesco.giuffridamayaanamaria.lazarsofiaalike'.leidilucia.lonardialessandro.nestorininicolo'.pasqualiarianna.pileriandrea.settealberto.sperimariavittoria.zordanasia.anselminicolo'.benedinigiulia.bertellegiulia.bodinifrancescoluigi.caiazzogiovanni.ceradinicamilla.chieppeedoardo.debondiana.eliseevfrancesco.facciolimaddalena.fasanimarco.filippinilucrezia.freddomartina.ghellerivanessa.lombardogabriele.margiottagiacomo.periniemma.predescumartina.righichiara.sartorivittoria.semenyuksofia.tomellericamilla.vallicellanicola.zabulicamaddalena.zanellacesare.zecchinellinoemi.amitranomyrhiam.baraevludovica.boscarosofia.chesiniirene.dalbonieleonora.filzgiulia.galassomatilde.girelliwijesinghearachchigedilsadikaveesha.karunaratneandrea.lamonatocamilla.michelonvittoria.michelonfederico.nalenoemi.piantoniarianna.ragusacarolina.renuccichiara.ricciadele.rincogabriel.scacciafilippo.stizzolidora.vailatipietromaria.villanimattia.vitalefederico.zampinixinyangleonardo.zhuobeatrice.zulianianna.andrioliriccardo.belfivladimir.berdianmatteo.calcaterrastella.casarottitodeschinigreta.castellanichloe.chiapperinitomellerimattia.ciocchettastella.cisamoloderoyesetz.cobboldanna.frescuraluca.ippolitifrancesco.lesoisserae.m'haijartommaso.malaguttimaddalena.marchiottoemilio.melottoemma.menegottigiulia.pasquatocesare.pavanalessandro.piubelloelenasofia.rizzonicola.salvettibenjamin.scholzludovicamaria.segalaalessandro.terellelorenzo.zardinimarco.zoccaratoelenagiulia.airineiemma.bombonatonumas.cingolanielisa.damocjacopo.delorenzoivan.dodonovjunxian.donggiuseppe.ferrarimatilde.guardinitommaso.guidolinanfal.idrissiandrea.libertianastasia.lovatobigunidenethra.marambagecristian.marisnicola.mascanzoniamelia.nicastrotimofey.plokhovnicola.reginatoenrico.riveraparizpietro.rizzodiego.salamonealexandra.tomelleriangelica.trichiesguglielmo.tridapaliviktoriacamilla.vivianileonardo.zanonikevin.zerlottotommaso.bicegopietro.bonizzatomia.borsaronina.debonigiulio.fantonimaria.filipponilily.huangoctavianamaria.luncasupietro.luzicrivellinigiulia.manganoanna.masenellileonardo.mazzianna.metzgiulia.mignonelorenzo.morelliclaudio.plataniagaia.rodegheremma.rossoncaterina.saggioroadelia.sartorimaddalena.sartorilucamihai.schiauilaria.silvestrisofia.speziejospephclaudio.spinelliangela.vismarafederico.zanetticristian.bianconiisabel.buonfiglibeatrice.caldrermatilde.consolaticamillamihaela.contilinda.croceveronicamaria.dalpratoalessioviorel.damiangiovanni.deraniangelo.domingojacopomaria.furialuigi.gherardimarco.giacomileonardo.grisibenedetta.guglielmimirela.lucicleonardo.michisorjago.orlandishavinatharaka.pererakurugamagediego.rizzioliandrea.scopacasaemmaolivia.tervonentommaso.tognellashayal.warnakulasuriyamanikkagetisseragiada.benicoisabella.bernardinellivittorio.bigonipietro.chiavegatorileyeduard.cookenea.doninimicol.facciottiandrea.fumagalliginevra.gobbianna.manzinimartina.mirandolaelia.molinarimichele.nicastroemma.ostojicroberto.parraarredondotommaso.pegoraroalessialuciana.potroghirenrico.pranzanemma.ramirezguglielmogiuseppe.ranierifilippo.roldotommaso.sommacampagnathirunniyanavindri.warnakulasuriyalowepietro.zenatijacopo.zuccottilinda.adamicecilia.baruffaldisara.bonemazzicecilia.castegnerojacopo.corazzamaria.coricafrancesca.deganilaura.ferrianviola.geliomarco.gervasinigiulia.giarettasara.letiziacamilla.marconeleonora.marconimanuela.melottielisa.mezzadrelligretaviola.mitidieriluca.orlandianna.pasqualiguido.pasqualottonoemisara.popaalice.porchiaalessandro.recchiatommaso.sardellimaria.zanettivalentina.zorzifrancisifeayichukwu.akabuezeviola.angeliniettore.bellottifrancesco.bendazzoligiulia.benedusipietro.bersaniaurora.brazzolizeno.brunelliludovica.carettaclaudia.castanobeatrice.colombarisylvia.coppolatharushi.disanayakavittoria.ferrarimaddalena.finimatilde.forcatomarco.gasparibianca.landigiovanni.magagnapietromaria.massaromargherita.montinivirginiavinicia.murariarianna.puppinimartinirossella.turriniamalia.zardiniyaqi.zhuleonardo.abdiajdavide.asquiniilaria.beniniparide.boarottoluca.bonomimatilde.bonuzzi_1cmattia.codognolamihaiadrian.comanescuanna.falsarolomatteo.falzoniriccardo.faustinimartina.floriomattia.gasparilorenzo.gelmettijunqiluca.guovadym.levitskyichiara.massarottoaurora.nadalinour.naouiauroraloreta.patuzzoelisabetta.preostigiulia.rensiluca.settenicola.trincasilvia.vicentiniaurora.anzisofia.bertele'chiara.busatoannalisa.calzaniccolo'.casarilgastone.colleonidavide.dalsenoleila.fenzimanuel.frapportifrancesco.letizialisamarie.mantovanizhang.meiqigiulia.menegazzisofia.molinariarianna.puscasurebecca.quintarellimatilde.quirinalialvise.rovedaasia.scarfo'anna.stradiottosofia.tregnaghiamina.wassagougioele.zoccatellinoemi.ariuandrea.baccolucreziamaria.bragantinivittoria.busolajacopo.cappellinelenasofia.cassatellamatteo.cecconinicolo'.chesiniilenia.conairene.doninicarolina.gaulelisa.hartmannalice.marchiniemmamaria.marinomerit.osayandeandrea.parrinelloginevra.peruginiandrea.pienazzazoe.recchiausangachathumi.rupasinghegiovanni.sartori_1esofia.toffalipietro.trevisiolgiovanni.zagliacecilia.zanardoriccardo.zanoccomaranipietro.adamimartinezmatteo.bolognesedario.canevadenise.chesinilaura.ciobanualessandro.corteromina.cotofaniguglielmo.fabbrigiada.federjayasooriyagonkaragetharushi.fernandoisabella.gasperisajithapietrocosta.gurunnanselagedaniele.maggiottonicolo'.mapelliedoardoconstantin.margineanumattia.marinchiara.martinicaeshenmicheleappuhamy.meththasinghearachchigeveronica.nicolifilippo.pavonegreta.radowskielisa.spazzinishenalferdincroos.warnakulasuriyaniccolo'.zampinipietro.zoninkarimomar.zoubirleonardo.zusiester.balzarrodavide.battagliamatteo.bertellipietro.bombarasara.cassantagemma.cazzadorivaleriu.cernilevschigiovanni.comerlatichloeelisea.corsomatteo.cortinitamara.costansamueledavid.deagostinidaniele.gasparininicole.lavarinimattia.leghidavide.marcolinianna.padovanigiacomo.piccionealessandrocarlomaria.quattrinimatilde.ruffocesare.sinicoedoardo.spiniellavanessa.zanettirocco.arcesesofia.bendazzoliriccardo.bonessoalessio.bustaggiriccardo.ciscatolorenzo.digiuseppezeno.kvavadzemarcello.magagnaalessandro.marazziedoardo.martaleiteranna.nilettichiara.oliosiantonio.pecorellagiovanni.pinaliiris.proviniletizia.righettigiovanni.sartori_3hbeatrice.ursogianmarco.valmatteo.vesentinizeno.vieroalessio.zitoemma.bonaveriedoardo.bredagabriele.calannirindinagiorgia.calvellicesare.cimarettifederico.citogabriele.esentegiacomo.frigoadam.gabsiandrea.garonziagata.leonardiarianna.mantovaniarianna.morofilippomaria.moschettamedeeamihaela.pavelmatilde.polijafederico.righetti_3igiacomo.rizzottiginevra.setaleandreivictor.tanaseilaria.tessarilorenzo.trevisaniandrea.tuppininicola.yurchakalvise.balassozeno.balassotommaso.bonominimichelle.bragazzailaria.cerianisimone.dallavalentinacarla.geraceirene.gerardivittoria.giacondajana.hysaludovica.manossidavide.melegaromattia.melottielena.morandidavide.pappaterragiovanni.remellipietro.residorimatilde.roscaalessandro.rossigiacomo.scappinivittoria.villardichiara.bernardonleonardo.bertoldialice.boniottooskar.borghesipietro.bortolasimarco.capodagliomatteo.cutrinosamuele.d'onofrioanna.faninimatteo.grigolettiriccardo.lavezzigaia.losapiomartina.mainentirita.mantovaniandrea.migliorinimartina.millosebastiano.nasovalentinalomba.pasettositijarajapaksha.rajapakshamudiyanselagealice.rallocamilla.rodegherallegra.roveratonicoletta.vincimatilde.zambelligiacomo.zatachettoalbertomaria.agostimarco.bianchiedoardo.biancolallaiedoardo.dallapellegrinamartina.galantegiovanni.giroaurorakexin.hegiulia.huelena.jingiulia.mateiaslorenzo.minoliticristian.mulasfilippo.piaseresaravalentina.polcevalentina.prigioniandrea.terellegiada.tinellimargherita.turriniloris.ulianafrancesco.vallenicolo'.zaccarellamichele.zhenggabriele.zulianibartolomeo.adamisofia.benettonanna.bighelliandrea.bradusara.bragantinisilvia.centurionisophie.condruzalberto.geremialuca.giacopuzziandrea.lonardimattia.lunardisilvia.marchionneandrea.modenamichelangelo.orsonicolo'.parolinimargherita.pavaranairis.pizzardifrancesco.ranieropietro.recchiaelisabetta.reppelealina.roscabianca.vaonaluigi.veronesielizaveta.akimovafrancescofortunato.arcudidario.bonacciniolivierimatteo.burigodefne.cengizrebecca.corradinivictoria.cossovelalice.dalmolinemma.donatellipamela.elkhatibfederico.falcettasamuele.fochimattia.fratellomartina.maccacaromarco.misinoraffaello.montollinicholasjake.nellasamuele.paganimaddalena.pellealessandro.pietrantoniogiulio.ruffiniclaudia.scolarichristian.soaveviola.tosigabriele.vigano'diego.zangrillobeatrice.zoppichiara.aprileedoardo.begninisalvatore.bonavitacarlo.brugalettafrancesco.campitellimattia.cordioliandrea.dallepezzemichele.disconsimarwa.elgharbaouidaniel.grykaleonardogiorgio.mansuetodiego.menegattimanuel.menegattigiovanni.nicolosorebecca.somettinicola.stegagnosimone.toscanimartinastella.tsakaloscristiano.vesentinifederico.zanoccoilaria.zinellibeatrice.zoccagloria.avesanigiulia.bordonigiulia.castelligiulia.ciseranigioia.decarlipietro.facciolimatilda.fasolistefaniagiulia.grigoroaiaiacopo.longhipietro.marchesigaia.notoeleonora.realipaolo.russoabramsveva.santinicola.scarcellaandreichristian.schiaumanuel.sciamannamargherita.soavenoemi.valbusaguido.vieromargherita.adamiaurora.ambrosimatilde.bonuzzianna.calmasinitommaso.carcanoalessandra.cassiolinicola.cavejariluca.faltraccofrancesco.framaringabriel.garonzigaya.giordanodavide.marchialice.matteazzinina.meneghinianna.olivierichristian.panatosarasofia.rocadiletta.rossilorenzo.sandrinivalentina.sangiorginicola.scardonivittoria.segattinifilippo.talaminigiacomo.viscontistefano.visentinianna.zammattiofavour.agbewanestemartino.bascherasaramaria.caccavalemattia.contimassimiliano.deangelisgiacomo.depaolivalentina.gottardiivan.karpenkoalessandro.leardinigiovanni.martellidaniel.menegazzofilippo.miazzialberto.pasquottosamuele.patrunosamuel.perbellinigiorgio.perfettialessandro.pileriedoardo.santianna.stanzialdavide.stradiottofilippo.tomasonimattia.tupputiluigi.ursellasarajoi.bettinazzipetro.burlakcesare.bussinellogiada.carlimassimo.compagnonematteo.fioratoriccardo.gallienrico.guerrierobalpreet.kumartommaso.liberatorelorenzo.luongolouiscarlos.mantovaniedoardo.marchialexandru-constantin.mocanumattiaosazee.nodarifederico.pacheranirmaldevumina.pattinigefernandopetar.pejicedoardo.pieropanandrea.plevaniaurora.policantealice.russoangelica.signorinigiulia.tezzachristian.toffalinialenrobert.tuguiislamovicguglielmo.ubertipierluigi.afribovittoria.avesanifederico.bellinialberta.bonettialissa.broccomatilde.candiopietro.cappellettielisabetta.carradoriarianna.castellanitheo.dalpozzosara.dimartinobianca.frattinitommaso.gariggiosuyingelena.guopietro.pavanmattia.piantavignagiacomo.pivairis.regazzinialice.salvettiriccardo.siderivittoria.soavebeatrice.sordofrancesco.vavalasebastiano.vignolagiovanni.borillemiriam.bozzielena.caltranvittoria.chiaramontewarnakulasuriyashwethaabhimanistella.coonghelucrezia.danzigiacomo.detognieleonora.galassochiara.gallazzipietro.gelmettifilippo.livatinogiovanni.martinieleonora.meghigiorgia.nacchiagiuliachiaramaria.peruffosofia.scudelettifilippo.toffoligiovanni.tognettivittoria.tombaccoangelica.trentinchiara.vesentiniayumi.zanettimatteo.accordinifederico.barichellofilippo.bellamolivittorio.berardoanita.bertialdo.bragantinifilippo.cappellettialina.chenriccardo.durantelinda.facciosabrina.fraccarolimatteo.guidialicechiara.levequeluigi.lorenzinifederico.lughezzanieddy.nadalimattia.perinaalessandro.sciottinicola.storticarlo.turatinicola.zamperiniraffaeleisidoro.bragantinimirunamaria.braiarianna.caciopposilvia.caniatochiara.castagnasofia.castagnettisilvia.d'agostiniagnese.dallavalentinapietro.dallavalentinaemanuele.dossilinda.erbistileonardo.galvanisara.gaspariluca.grinzimartinadaiana.marocchiomarco.misuriellogiulia.moiolaletizia.montresorpietro.moranduzzomatteo.negrellifrancesca.paratorealicealanna.stewarttommaso.zanininicola.andriolilorenzo.arduinigiorgia.bellinipietro.benedettimattia.bortolomasilorenzo.bottacinisara.camnasiocecilialouise.cataringraziella.cecoltanaurora.chesinialessandra.falziluca.ferraroemma.gasparatosofia.gozzolino.hartmannsilvio.mihalitrevisanbenedetta.mirandolalavinia.ravieledavide.sandrinimaia.solerogioia.tonioloruoyi.yunoemi.aprealorenzo.baldigioele.baldoelisa.benagliosebastiano.borsaroleonardo.bortotmatteo.cecchinilorenzo.chiavegattifrancesco.costanzigiovanni.dallavallefrancesco.deanesilorenzo1f.faustinigiovanni.fiorentinielia.isolioleksandra.melnychukvanessa.montagnanialessandro.munarinleonardo.oliosianna.ortelliabdulmuksitmazu.osumanuzeno1f.pellizzarifabio.piantavignaguilherme.schiochetdesouzaalessandro.socalcesare.vicentinimatilde.vivianifrancesco.zanardoascaniocasian.zepagaia.avesanibeatrice.battistoninicola.benvenutimarco.calastrichristian.conservaalessandro.cordonipaolo.cossaedoardo.dossimaxim.fontanaenrico.forghierifederico.furlanimarcello.grisidavide.huellerfilippo.mazzaimelissa.muzzioliluca.oddoalessiofrancesco.oliboniveronica.ottavianiemanuele.pasileonardo.pasquettofilippo.pizzinielia.righettierica.sofronovicinoemi.stevanmatildemicol.tacconimartina.vassanelliluca.vlasonjicdavid.vorosciucroberta.zaninialice.albierotommaso.ambrosimarco.ascionepietro.bagolinfrancesco.casarosasara.castellithomas.dalzovosofia.fregataaurora.gradaarianna.hajekandrea1h.marcoliniriccardo.maroccolagiovanni.mattarellisilvia.morettonico.nilettifedericocorrado.ramettamattea.rocchiguglielmo.rosdinopietro.sanzogiovanni.saurocaterina.scolalucia.tessarivirginia.villacamilla.adamilucamaria.bergamaschiilaria.bianchialex.birtelegiulio.borsaromartina.bortolozzodaniele.bragantinisofiacatherine.castionicharlize.cazzarosageangelina.corsoriccardobruno.costamagnadavide.disconsilaura.frigomattia.girarditommaso.grisiemmasofia.ledricamilla.magagnaettore.marconcineric.marisalessandro.merigoalessandro.migliorinifrancesco.montresormatteo.sangiorgistephaniesekyibea.siawsofia.torreislatommaso.zoccaratonicolo'.alaimodiego.ascanimartin.assfalgguglielmo.baraldiaurora.boninsegnagreta.brunellimorgana.campedelliluca.dallavallecosimo.digeronimogioia.gauleolivia.gibellatoadele.gibertiluca.grigolettiandriana.korolovalorenzo.landoniviola.marcorincecilia.meneghinimichele.panatoalberto.salvagnogiorgio.santomartinogiulia.scuccimarraasia.sonaanna.sondariccardoemanuel.tampugiovanni.trevisiolzeno.zammattiosofia.baldimatilde.bellinisofia.bendinelligabriele.bertele'giovanni.boschialessiaandreea.burghiuniccolo'.castiglionigiacomo.colleonigiacomo.dottorifederico.durantemarco.facciolianna.fioridoeva.geliomattiafrancesco.gottinmariasole.landialessandro.lonardimartakarol.mangialavoriaurora.marce'pierluigi.marinoriccardo.notasaramaria.pasettofabio.pavanemma.residorifrancesco.scofanomatteo.strenghettonicolo.antonacidaniel.bartingerlaura.bobernagaedoardodaniel.brankristaliadonatela.braoemmamaria.cantoriufederica.cipolladea.corra'andrea.cuselliniccolo'.dallapellegrinazeno.danesericcardo.dibernardomassimo.digoreyaojie.dongartin.emadiandanisara.fadinifirdaus.fissaldiego.frapportidehashiashinsana.kurukulasuriyafederico.latellavaleriano.leonigiulia.ligozzizhixinsofia.linfilippo.martinienrico.perinialessandro.peruzzizeno.realiamanda.scholzevaester.vendraminettozishan.yehandialdo.zhaorebeccasofia.zullosamuele.arriguccisamuele.bazzolimarco.biasinfederica.buniottoenrica.castrovilliarianna.consolinizeno.delmontelorenzo.elampinipietro.faccinialberto.favallimatilde.girlandaandrea.lazzarintito.luzicrivellinimatteo.maimeritommaso.manziniriccardo.mercizaccaria.monesecarlo.montresorumberto.negrianna.pasquottoviola.romanatopaola.sartorealessandro.stellamariia-yelyzaveta.tkachukpietro.tomatiscostanza.ursoadrian.velascoluca.zahariasvevasofia.zanellaallegra.agostimaya-gio'.albaneseangela.amodioleonardo.arcamargherita.benedetticecilia.bottaroilaria.brunnoe'.buniottogemma.burigomichele.campostrinimarcelle.citoallegra.gambarinalice.giardiniarshpreet.kaurlinda.menonsanuthirachela.mutuwadigeanita.poerioriccardo.rambellizeno.ruffogiacomo.santangelofrancesco.scarboloalicesofia.tiffigiovanni.viansonedoardomaria.villaanais.zanolinieleonora.abdiajanna.adamiviola.bellinigiorgio.bloiseelisabetta.bruttienea.caucchioliadele.dellapepamattia.fiorinilisa.girimondoomar.jaberaureliaperera.jayasekarapatabendigevittoria.lovagliofilippo.maranimattia.melchiorivittoria.mischisebastiano.montoliemma.nerialessio.parolinianna.perbelliniviola.righettiniriccardo.scamperlepietro.schenalniccolo'.scolarilucio.sevalie'tommaso.tenutiemanuele.tommasinipietro.ugoliniceciliaclaudia.venturichanel.vorosciuczhiyuanandrea.yunicola.zhugiulia.zobeclorenzo.bertolinisofia.besleagaanna.biasialessandro.bottaripetra.busellatoevelyn.calmicgaia.caloigabriel.canterielia.cicchellerogaia.comencinimartina.cutinosamuel.dasilvasignorinikissyla.duarteaurora.favazenoosaro'.felicekenzotommaso.ishikawaedoardo.leardiniaurora.lucacisebastiano.melottimanuel.molinaridavid.mosconichristabeliyobosa.nobleirene.pasquettosofia.ramosthomas.rigatellieleanorsulwen.stewartvyacheslav.sychenkoluca.toffalonialberto.valottoleonardo.violamichele.zagliaalessandro.zambellivalentina.zitoalice.begninifrancesco.betettotommaso.bossikevin.campostrinigiammarco.castionileonardoantonio.coltrizeno.corainginevra.ferrozoe.fiorifrancesca.galloalessandro.gaolemiriam.lucchinitea.lugaresimarta.mannomatilde.manzinivittorio.pasquettoandrej.petrovicalessandro.realicarlo.sanzodavide.sapuppoalessandra.spinelligavrilo.stankovicmargherita.trevenzolivittoria.valbusaannasadali.warnakulasuriyamahamandadigefernandoalessandro.yangyaofilippo.zancanarialita.zaniniedoardo.albertinimattia.altemanileonardo.andrieselia.boschettiilenia.brunorikelvin.calmicaurora.caputomaya.cavaliericristiano.cesareosofia.circamanuel.d'oraziofrancesco.dacomomattia.fasolirocco.fraizzolifrancesco.fregataalessandro.girlandavladimir.hanganusharon.lateganoiulian.leftergiulia.liucamilla.mirandolaedoardo.mongellileonardoalejandro.naranjogallardoleonardo.pasquottopetra.pimazzonigiancarlo.russoemma.scarsettoenrico.strinapetra.toscanomiryam.vantininiccolo'.zanusofatimaezahra.zaouid";
}






var AllPropsWithDigits=getAllPositiveProps();
var AllPropsWithDigitsWebmaster=getAllProps();
var userEmail=Session.getActiveUser().getEmail()
//var user=extractNameFromEmail(userEmail);
//let regex=new RegExp(""+user,"i");

function getUser() {
  //return Session.getActiveUser().getEmail().split('@')[0].toLowerCase();
  return Session.getActiveUser().getEmail().toLowerCase().split('@')[0];
}

function testUser() //restituisce la property: Ll'utente può votare se non c'è la property
{
  //Logger.log(regex.test(users));
  //return users.includes(extractNameFromEmail(Session.getActiveUser().getEmail()));
  //Logger.log(leggiProprieta("ALUNNI").includes(extractNameFromEmail(Session.getActiveUser().getEmail())));

  return properties.getProperty(user);

/*
let puoVotare=true;
  if (properties.getProperty(user)) puoVotare=false;

return puoVotare;
  //return users.includes(user);
*/

}

/*
function removeUserFromAlunni() //non serve più
{

  properties.deleteProperty(user);
*/
  /*
  //let properties = PropertiesService.getScriptProperties();
  users=users.replace(user,"");
  properties.setProperty("ALUNNI",users);
  */
/*
}
*/

function removeUserFromProperty(user="stefano.gugole") //non serve più
{

  properties.deleteProperty(user);
}





/*
function extractNameFromEmail(email) {
  const regex = /^([^@]+)@/;
  const match = email.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null; // Or handle the case where no match is found.
  }
}
*/


function sendEmailFromWeb(prima,seconda,terza,quarta) {  //bisogna calare value!!!!!!!!!!!!!
  
  let stringa="";
  //Secondo controllo qui che magari l'utente non aggiorna la pagina
  const lock = LockService.getScriptLock(); // Correct

  try {
      // 1. Chiediamo il permesso al semaforo (attesa 20 sec)
      lock.waitLock(30000);
      var properties = PropertiesService.getScriptProperties();
      Utilities.sleep(50);
      if (properties.getProperty(user))
      {
        
        Logger.log("L'utente "+user+" ha già votato! Non ha aggiornato la pagina");
        stringa="L'utente "+user+" ha già votato! Non ha aggiornato la pagina";
        
        try {
          lock.releaseLock(); // LIBERO IL SEMAFORO IL PRIMA POSSIBILE
        }
        catch (e)
        {
          Logger.log("In sendmail l'utente ha già votato, non riesco a liberare lucchetto a "+user);
        }

        return stringa;
        
      }
      else{
          //const lock = LockService.getScriptLock(); // Correct


  
    
          //let valore = properties.getProperty(key);
      

          //CONTO I TIPI "D"
          let tipi="";
          if (JSON.parse(properties.getProperty(prima)).n<1)
          {
            stringa=stringa+" "+prima+" già piena, aggiorna la pagina e ritenta \n";
          }

          var regex=new RegExp("12$","i");
          if (regex.test(prima))
          {
              //niente da fare
              tipi.concat(prima[0]);
          }
          else
          {
            tipi.concat(seconda[0]);
            if (JSON.parse(properties.getProperty(seconda)).n<1)
            {
              stringa=stringa+" "+seconda+" già piena, aggiorna la pagina e ritenta \n";
              
            }
          }

          if (JSON.parse(properties.getProperty(terza)).n<1)
          {
            stringa=stringa+" "+terza+" già piena, aggiorna la pagina e ritenta \n";
          }

          var regex=new RegExp("34$","i");
          if (regex.test(terza))
          {
              tipi.concat(terza[0]);
              //niente da fare
          }
          else
          {
            tipi.concat(quarta[0]);
            if (JSON.parse(properties.getProperty(quarta)).n<1)
            {
              stringa=stringa+" "+quarta+" già piena, aggiorna la pagina e ritenta \n";
            }
          }
      
          ///////////////////// TRATTA QUI I TIPI

          let count = (tipi.match(/D/g) || []).length;  //qui in realtà il check è fatto nel frontend

          if (count > 1) {
            stringa.concat("Hai scelto troppe attività D, al massimo una. Ricarica la pagina");
          }
      
          if (stringa.length==0)
          {
            
            
      /* 
              
              var userEmail = Session.getActiveUser().getEmail(); // Ottiene l'email dell'utente
              var myEmail = "autogestione.iscrizioniBiennio@messedaglia.edu.it"; //"stefanogugole@gmail.com";//"webmaster@messedaglia.edu.it"; //// Sostituisci con il tuo indirizzo email
              
              let oggetto="{ \""+prima+"\" : \""+user+"\" , ";
              if (seconda.length>0)
              {
                oggetto=oggetto+"\""+seconda+"\" : \""+user+"\" , ";
              }
              oggetto=oggetto+"\""+terza+"\" : \""+user+"\"";
              if (quarta.length>0)
              {
                oggetto=oggetto+" , \""+quarta+"\" : \""+user+"\"";
              }
              oggetto=oggetto+" }";

              MailApp.sendEmail({
                to: myEmail+","+userEmail,
                subject: oggetto,
                body: "",
                replyTo: userEmail // Imposta l'utente come mittente
              });
              

      */

              creaProprieta(prima,JSON.parse(properties.getProperty(prima)).n-1,prima[0],"")//new Array(extractNameFromEmail(userEmail);
              var regex=new RegExp("12$","i");
              if (regex.test(prima))
              {}
              else
              {
                creaProprieta(seconda,JSON.parse(properties.getProperty(seconda)).n-1,seconda[0],"");
              }

              creaProprieta(terza,JSON.parse(properties.getProperty(terza)).n-1,terza[0],"");


              var regex=new RegExp("34$","i");
              if (regex.test(terza))
              {}
              else
              {
                creaProprieta(quarta,JSON.parse(properties.getProperty(quarta)).n-1,quarta[0],""); 
              }

              try
              {
                
                properties.setProperty(user, JSON.stringify([prima, seconda, terza, quarta]));
                Logger.log("Iscritto "+user+"  "+JSON.stringify([prima, seconda, terza, quarta]));

                Utilities.sleep(50);
                
                //removeUserFromAlunni(); //old
              }
              catch(err)
              {
                Logger.log("errore nell'iscrizione: Errore di rete o timeout: "+userEmail);
              }
              

              
            }

          lock.releaseLock(); // LIBERO IL SEMAFORO IL PRIMA POSSIBILE
        
          // SCRITTURA POST-LOCK
          if (stringa.length == 0) {
            try {
              var ss = SpreadsheetApp.openById(idFoglioBiennio).getSheetByName("Iscrizioni");
              var lastRow = ss.getLastRow() + 1;
        
              // Definiamo i dati da inserire
              var riga = [new Date(), userEmail, prima, seconda, terza, quarta];
                
              // Scriviamo esattamente nel range partendo dalla prima colonna (1)
              // getRange(riga, colonna, numero_righe, numero_colonne)
              ss.getRange(lastRow, 1, 1, riga.length).setValues([riga]);
              //ss.appendRow([new Date(),userEmail, prima, seconda, terza, quarta]);

              invioCorsoEsaurito(prima);
              invioCorsoEsaurito(seconda);
              invioCorsoEsaurito(terza);
              invioCorsoEsaurito(quarta);
              


            } catch(e) {
              // Se fallisce qui, il posto è già stato scalato! 
              // Dovresti loggare l'errore pesantemente per recuperarlo a mano.
              Logger.log("CRITICO: Posto scalato ma riga non scritta: " + new Date()+" "+userEmail+" "+prima+" "+seconda+" "+terza+" "+quarta);
            }
          }

          return stringa; //non so a cosa serva, forse ritorna alla GUI
        }
      }
      catch (e)
        {
            Logger.log("Could not obtain lock or error occurred: " + e.message);
            return "Il server è occupato, riprova tra un momento.";
        }
      finally {
        if (lock.hasLock()) lock.releaseLock(); // Sicurezza se crasha sopra

        
        }


  }
  function invioCorsoEsaurito(prima)
  {
    if (prima && JSON.parse(properties.getProperty(prima)).n==0)
    {
                MailApp.sendEmail({to: "webmaster@messedaglia.edu.it",subject: prima+" esaurito posti",body: ""});
    }
  }


  
    



