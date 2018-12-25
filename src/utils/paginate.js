import _ from 'lodash';   

export function paginate(items, pageNumber, pageSize){
    const startIndex = (pageNumber -1 ) *pageSize;
    //_(items) -> array to lodash wrapper
   return _(items).slice(startIndex).take(pageSize).value();
}