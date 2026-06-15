class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // filter() {
    //     const queryObj = { ...this.queryString };
    //     console.log(queryObj)
    //     const excludedFields = ['page', 'sort', 'limit', 'fields'];
    //     excludedFields.forEach(el => delete queryObj[el]);
    //     console.log(queryObj)
    //     // 1B) Advanced filtering for gte/gt/lte/lt
    //     .............................

    //     this.query = this.query.find(JSON.parse(queryStr));

    //     return this;
    // }

    // sort() {
    //     if (this.queryString.sort) {
    //       //sort('price rating')
    //        ..........
            
    //     }
    //     // sort by default
    //     else {
    //         this.query = this.query.sort('-createdAt')
    //     }
    //     return this
    // }

    // limitFields() {
    //     if (this.queryString.fields) {
    //         ................................
    //     }
    //     else {
    //         this.query.select('-__v');
    //     }
    //     return this
    // }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit
        // console.log(this.queryString)
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}


export default APIfeatures;