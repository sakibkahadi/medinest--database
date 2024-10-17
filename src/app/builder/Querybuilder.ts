import {FilterQuery, Query} from 'mongoose'
class QueryBuilder<T>{
    public modelQuery:Query<T[],T>;
    public query : Record<string,unknown>;
    constructor (modelQuery: Query<T[],T>, query:Record<string,unknown>){
        this.modelQuery =modelQuery;
        this.query= query
    }


    sort(){
        const sort = (this?.query?.sort as string)?.split(',')?.join(' ') || 'createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);
        return this
    }

    search(searchableFields:string[]){
        const searchTerm = this?.query?.searchTerm;
        if(searchTerm){
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field)=>({
                    [field]: {$regex: searchTerm, $options:'i'},

                }) as FilterQuery<T> )
            })
        }
        return this;
    }


}



export default QueryBuilder