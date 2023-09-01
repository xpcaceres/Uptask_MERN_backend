import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt';
import { decrypt } from "dotenv";

//DEfinir Schema o estructura de base de Datos
//trim quita los espacios al principio y al final, no asi los espacios de enmedio
//timestamps crea dos columnas mas, una de creado y otra de actualizado
const usurioSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true,
    },
    password:{
        type: String,
        require: true,
        trim: true,
    },
    email:{
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    token:{
        type: String,
    },
    confirmado:{
        type:Boolean,
        default: false,
    },
    
},{
    timestamps: true,
});
//Este codigo se va a ejecutar antes de guardar los valores en la base de datos
usurioSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next(); 
    }
    const salt = await bcrypt.genSalt(10);//10 rondas
    this.password = await bcrypt.hash(this.password, salt);  
});

usurioSchema.methods.comprobarPassword = async function(passwordFormulario){
     return await bcrypt.compare(passwordFormulario,this.password)
}

const Usuario = mongoose.model("Usuario", usurioSchema);
export default Usuario;