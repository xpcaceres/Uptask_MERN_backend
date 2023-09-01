import mongooes from 'mongoose';

const conectarDB = async ()=>{
    try {
        const connection = await mongooes.connect(
            process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const url =`${connection.connection.host}:${connection.connection.port}`;

        console.log(`MongoDB conectado en ${url}`);

    } catch (error) {
        console.log(`error: ${error.messaje}`);
        process.exit(1);
    }
};

export default conectarDB;