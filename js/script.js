    const getData = (id, callback = () => {}) => {
        if (!id) {
            return callback(new Error('getData: ID not specified'));
        }
        
        setTimeout(() => {
                    const data = {
                        utime: Date.now()
                    };
            callback(null, data);
        }, Math.random() * 1000);
    };

    const mainFn = async (data) => {

        const single1 = new Promise(function(resolve) {
            getData((data.single), function callback(err, data) {
                if(err) {
                    console.log(err);
                    return;
                }
                resolve (data);
            })
        }).then(current => data.single = { id: data.single, data: current});

        const multipleArr = [];

        data.multiple.forEach((i,index) => {
            const multiple = new Promise(function(resolve) {
                getData(i, function callback(err, data) {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    resolve (data);
                })
            }).then(current=> data.multiple[index]={id:i, data: current});
            multipleArr.push(multiple);
        })

        await Promise.all([single1, ...multipleArr]);
        
        return Promise.resolve(data);
    };

    mainFn({
        id: 78,
        title: 'Some title',
        single: 12345,
        multiple: [56783, 46573, 13251]
    }).then((result) => {
        console.log(result);	
    });

    /**{
        id: 78,
        title: 'Some title',
        single: { id: 12345, data: { utime: ... }},
        multiple: [
            { id: 56783, data: { utime: ...  }}, 
            { id: 46573, data: { utime: ...  }}, 
            { id: 13251, data: { utime: ... }}
        ]
    }*/