// assicurarsi di aver installato typescript con:
// npm i -g typescript
// assicurarsi che ci risponda correttamente ad una richiesta di versione (significa che è installato)
// tsc -v
console.log("hello typescript!");
// Type Inference (inferenza del tipo)
let myVar = 50; // typescript cercherà di riconoscere e assegnare automaticamente i tipi rispetto ad un valore iniziale
// laddove possibile sarebbe meglio lasciargli ricavare il tipo in automatico
// quindi evitiamo di essere espliciti dove non serve
// let myVar: number = 50;
let myStr = " Stefano "; // il tipo viene inferito come stringa in automatico a partire dal valore che abbiamo assegnato
// anche in questo caso assegnare un tipo manualmente :string sarebbe ridondante
// quali sono i tipi disponibili?
// TIPI PRIMITIVI
// string
// number
// boolean
// null
// undefined
// tipi particolari
// any - !!! da non usare mai se possibile !!!
// never - un tipo che non avrà mai un tipo
// unknown - un tipo inizialmente sconosciuto ma che potrà cambiare dal suo contesto di utilizzo
// void - specie per le funzioni indica una funzione che non ha un return
// TIPI STRUTTURALI
// Object
// Array
// Function
let myNum = 5; // TODO: togli questo any ASAP
myNum = "5";
// utilizzare any farà "spegnere" i controlli di TypeScript per quella definizione/operazione.
// di fatto non staremo più usando i benefici di avere questo ambiente
// non avremo più nessun aiuto o prevenzione errori
let newVar; // in questo caso typescript non poteva sapere che tipo di dato sarebbe stato assegnato in futuro, perché non aveva un valore iniziale.
newVar = "Epicode";
// newVar = 56; // avendo inserito un tipo nel momento dell'inizializzazione, typescript mi impedisce giustamente questa riassegnazione
// const constVar; // le costanti devono essere sempre inizializzate con un valore da subito! non potendo mai cambiare il dato interno sarebbero condannate
// a non averne mai uno, quindi inutili di fatto.
console.log(myStr.trim());
console.log(newVar.substring(1, 3));
console.log(myVar.toString());
// console.log(myVar.trim()) // errore: trim non esiste sul tipo number
// FUNZIONI
const sayHello = () => {
    return "hello typescript";
};
console.log(sayHello().slice(0, 4));
console.log("STARTS WITH", sayHello().startsWith("hel")); // metodo più recente della versione usata di default per la compilazione in js es3
// const additionWithChecks = (n1, n2) => {
//   if (typeof n1 === "number" && typeof n2 === "number") {
//     return n1 + n2;
//   } else {
//     return "Devi passare un numero, " + n1 + " e " + n2 + " non sono dei numeri";
//   }
// };
// console.log(additionWithChecks("2", "3"));
// console.log(additionWithChecks(2, 3));
const additionWithTS = (n1, n2) => {
    return n1 + n2;
};
console.log(additionWithTS(5, 6));
// console.log(addition("5", "6")); // ora TS riconosce i due parametri con tipo assegnato number, di conseguenza non ci accetterà NIENTE che non sia un numero
const addition2 = (n1, n2) => {
    const sum = n1 + n2;
    return sum.toString();
};
console.log(addition2(1, 3));
// in TypeScript è buona prassi andare a definire il tipo dei parametri, e la maggior parte delle volte il tipo del dato in uscita dalla funzione viene
// inferito in automatico, non occorre specificarlo. Solo quando abbiamo esigenze particolari allora possiamo fare in modo di creare una condizione ben precisa
// in cui entrino dei numeri come parametri e ne esca una singola stringa. Si può specificare anche il tipo in uscita della funzione
// che dovrà essere per forza una stringa
// TYPE UNION - unione di due o più tipi assegnabili ad un qualche contenitore di valore
let whatever;
if (4 < 8) {
    whatever = "stefano";
}
else {
    whatever = false;
}
// rassicureremo TS del fatto che useremo slice su whatever solo se saremo assolutamente certi che sia effettivamente una stringa
if (typeof whatever === "string") {
    whatever.slice(1, 3);
}
// quando usiamo la type union TS diventa molto stringente sui controlli e sulle operazioni che ci permetterà di fare
// type casting - conversione del tipo
// per poter utilizzare uno slice in una condizione in cui potrebbe non essere presente, per via della union string | boolean
// bisogna specificare l'utilizzo che ne faremo di whatever
whatever.slice(2, 3);
// noi sapevamo che per via del controllo 4 < 8 avremmo sempre avuto true nella condizione, ma TS non è abbastanza intelligente per capirlo a priori
// il suo lavoro è quello di segnalare anche POTENZIALI problemi futuri. cosa che sarebbero avvenuti nel caso in cui il controllo dell'if fosse diverso
// in un secondo momento.
// possiamo andare a rassicurarlo o utilizzando la variabile nel contesto di un altro controllo o usando il "type casting" che converte il tipo,
// la variabile da quel punto viene intesa come stringa e basta
// il tipo unknown
// il tipo unknown acquisisce il suo valore di tipo in base al contesto di utilizzo
let maybe;
if (maybe === true) {
    const myBoolean = maybe; // maybe in qunto true può essere assegnato ad una variabile che accetti valori booleani
    // const anotherVar: number = maybe; // errore perché se siamo qui dentro maybe è un valore di tipo boolean
}
if (maybe === "una stringa") {
    const myString = maybe; // il tipo di maybe diventa il valore letterale "una stringa" che è accettato da un contenitore che si aspetta stringhe
}
// in questo caso possiamo usare il contenitore di tipo (ALIAS) al posto della definizione di tipi inline, otteniamo lo stesso effetto
const mixedParams = (param1, param2) => {
    // return (param1 as number) + (param2 as number)
    if (typeof param1 === "number" && typeof param2 === "number") {
        return param1 + param2;
    }
    else if (typeof param1 === "string" && typeof param2 === "string") {
        return param1 + param2;
    }
    else {
        return param1 + param2;
    }
};
mixedParams(2, 3);
mixedParams("2", "3");
// ARRAY
const myArray = []; // non è troppo utile in TS creare un array in questo modo, perché verrebbe inferito automaticamente un tipo never[],
// ovvero array di tipi never
// myArray.push(2) // anche perché non potremmo mai riempirlo con nessun tipo di dato
// però abbiamo bisogno spesse volte di inizializzare un array vuoto... quindi? come fare?
// gli assegneremo un tipo in partenza, oppure inizializziamo l'array già con dei valori
const myArrInferred = [];
myArrInferred.push(2);
myArrInferred.push(4);
myArrInferred.push(6);
myArrInferred.forEach(n => n.toString());
const myArrInferred1 = [];
myArrInferred1.push("uno");
myArrInferred1.push("due");
myArrInferred1.push("tre");
myArrInferred1.forEach(s => s.toUpperCase());
const myArrInferred2 = [];
myArrInferred2.push(2);
myArrInferred2.push("uno");
myArrInferred2.forEach(el => {
    if (typeof el === "string") {
        el.trim();
    }
});
const myArrInferred3 = [];
myArrInferred3.push(2);
myArrInferred3.push("uno");
const myArrInferred4 = [];
myArrInferred4.push("uno");
myArrInferred4.push("due");
myArrInferred4.push("tre");
myArrInferred4.forEach(el => el?.trim()); // questo punto di domanda è l'optional chaining,
// ci permette di verificare l'esistenza dell'elemento, quindi non undefined, prima di utilizzarlo
// TUPLE - tupla, una sorta di array con tipi di dato in posizioni specifiche e fisse
const myTuple = [0, "1"];
const myTupleOfThree = [0, "1", true];
const myTupleOfFour = [0, "1", true, "2"];
myTuple[0].toFixed(1); // essendo in prima posizione un numero, ci ha suggerito SOLO i metodi per i numeri
myTuple[1].trim(); // essendo in seconda posizione una stringa, ci ha suggerito SOLO i metodi per le stringhe
const [first, second] = myTuple; // la tupla non ha senso di essere ciclata con i metodi più comuni,
// più spesso si destruttura l'array e si utilizzano gli elementi trovati in determinate posizioni direttamente
// FUNCTION TYPE
// la definizione del tipo funzione assomiglia alla definizione di una funzione arrow,
// ma viene impostato come valore di tipo di una variabile inizialmente vuota, che riceverà un valore in futuro
let newFunc;
newFunc = addition2;
// newFunc = additionWithTS; // il tipo di  additionWithTS non coindice al tipo che abbiamo richiesto di avere nella variabile newFunc
// newFunc = additionWithChecks; // come sopra
// OGGETTI
// dichiarare un oggetto dentro una variabile, come per altri dati, fa inferire un tipo in automatico
const obj = {
    coordinates: { lat: 12.98123, lon: 43.9812 },
    name: "test"
};
const person = {
    name: "Stefano",
    surname: "Miceli",
    age: 34
};
const teacher1 = {
    name: "Stefano",
    surname: "Miceli",
    age: 34,
    role: "frontend teacher",
    isLiveNow: true,
    isRemote: true,
    active: true
};
const teacher2 = {
    name: "Stefano",
    surname: "Casasola",
    age: 35,
    role: "frontend teacher",
    isLiveNow: false,
    isRemote: true,
    active: true,
    yearsOfExp: 5.5
};
// ora nell'utilizzare teacher1, applicando il punto, ci verranno anche suggerite tutte le proprietà disponibili in quell'oggetto!
// perché ormai sono documentate
teacher1.age.toString();
const student1 = {
    name: "Mirko",
    surname: "Abozzi",
    numberOfEyes: 2,
    height: "180cm",
    hairColor: "lightbrown",
    hasWebcam: true,
    batchName: "FS0424",
    preferredTopic: "React"
};
const student2 = {
    name: "Todor",
    surname: "Petrov",
    numberOfEyes: 2,
    height: "176cm",
    hairColor: "lightbrown",
    hasWebcam: true,
    batchName: "FS0424",
    preferredTopic: "JS"
};
const student3 = {
    name: "Dario",
    surname: "Cecchinato",
    numberOfEyes: 2,
    height: "176cm",
    hairColor: "brown",
    hasWebcam: true,
    batchName: "FS0424",
    preferredTopic: "TypeScript"
};
// creiamo un array di questi elementi
const arrOfStudents = [];
// abbiamo specificato il tipo dell'array usando l'interfaccia, quindi un array di quelle interfacce
// sintassi equivalente alla precedente per assegnare EpicodeStudent come tipo dell'array
// const arrOfStudents2: Array<EpicodeStudent> = []
arrOfStudents.push(student1);
arrOfStudents.push(student2);
arrOfStudents.push(student3);
console.log(arrOfStudents);
arrOfStudents.forEach(student => console.log(student.name));
// il map crea un array di sole stringhe, quindi il tipo corretto da assegnare a questa viarible sarebbe proprio string[]
const arrOfStudName = arrOfStudents.map(student => student.name);
const U1 = {
    name: "Unit1",
    assignedTeacher: ["Riccardo Gulin", "Stefano Miceli"],
    topic: "HTML"
};
const U2 = {
    name: "Unit2",
    assignedTeacher: "Stefano Miceli",
    topic: ["UX/UI", "Bootstrap", "SASS", "JS3"]
};
const U3 = {
    name: "Unit3",
    assignedTeacher: "Stefano Miceli",
    topic: [
        {
            weeklyTopics: ["React Intro", "State", "Props"]
        },
        {
            weeklyTopics: ["React Intermediate", "Lifecycle Methods", "React Router", "React Testing - Vitest"]
        },
        {
            weeklyTopics: ["Redux", "TypeScript"]
        }
    ]
};
