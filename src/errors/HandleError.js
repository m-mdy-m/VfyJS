function boolean(index){
    if(typeof index !== 'boolean'){
        throw new Error("")
    }
    return true;
}