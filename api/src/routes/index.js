const { Router } = require('express');
const axios = require ('axios');
const {Dog, Temperament} = require ('../db');
const {API_KEY} = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getFromApi = async () => {
    const api = await axios.get (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const dogList = await api.data.map(e =>{
        return {
            id: e.id,
            name: e.name,
            heightMin: e.height.metric.split('-')[0],
            heightMax: e.height.metric.split('-')[1],
            weightMin: e.weight.metric.split('-')[0],
            weightMax: e.weight.metric.split('-')[1],
            life_span: e.life_span,
            temperament: e.temperament,
            image: e.image.url,

        }
    })
  
    return dogList;
}

const getFromDB = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
}

const getAll = async ()=> {
    const api = await getFromApi();
    const db = await getFromDB();
    const all = api.concat(db);

    return all;
};


router.get("/dogs", async (req, res)=>{
    
        const allDog = await getAll()
      
        const name = req.query.name;
        if(name){ //si hay un nombre, filtralos y transforma mayusc por minusc
            let dogName= await allDog.filter( 
                e => e.name.toLowerCase().includes(name.toLocaleLowerCase()));
                dogName ? //encontraste un nombre?
                res.status(200).send(dogName):
                res.status(404).send('Name not found');
        }else {
            res.status(200).send(allDog); //sino hay name pasado por query, envia todos los dogs
        } 
    
    });

router.get("/temperaments", async(req, res)=>{
        let temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        let tempMap = temperamentApi.data.map( e => e.temperament).toString(); //mapeo toda la data de temperamentos
        tempMap = await tempMap.split(', '); // separo los string con ,
        const tempSpace = await tempMap.map(e => {
            if (e[0] == ' '){
                return e.split('')
            }
            return e;
        })
        const tempNotSpace = await tempSpace.map(e => { //vuelvo a mapear 
            if (Array.isArray(e)){
                e.shift();
                return e.join('')
            }
            return e;
        })

        await tempNotSpace.forEach(e =>{
            if(e != ''){
                Temperament.findOrCreate({
                    where: {
                        name: e
                    },
                })
            }
        })
            
        const allTemps = await Temperament.findAll();
        res.status(200).send(allTemps)
});

router.get("/dogs/:id", async (req, res)=>{
    
    const {id} = req.params;
    const allDog = await getAll();
    if(id){
        let dogId= await allDog.filter( e => e.id == id);
        dogId.length ?
        res.status(200).send(dogId):
        res.status(404).send('Id not found');
    };
     
});

router.post("/dogs", async (req, res)=> {
        const {name,heightMin,heightMax,weightMin,weightMax,life_span,createdInDb,temperament} = req.body;
        let newDog = await Dog.create({
            name,
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            life_span,
            image,
               
        });
        let temperamentDB = await Temperament.findAll({
            where: {name: temperament } //le pido que busque las que coincidan con el temperament que llega por body
        });
        newDog.addTemperament(temperamentDB) //le pido que agregue las que coincidieron con el tmeperament pasado por body
         res.status(200).send('New dog was created');

});

module.exports = router
