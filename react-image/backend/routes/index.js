const router = require('express').Router();
const modelImage = require('../models/data');
const fileUpload = require('../middlewares/file-upload');
const fs = require('fs');

const upload = fileUpload.array('images',2);;

router.get('/', async (req, res) => {
    let fetchData;
    try{
        fetchData = await modelImage.find();
        // console.log('FETCH: ', fetchData)
    } catch (err) {
        console.log('FETCH ERROR');
    }
    res.status(200).json(fetchData);
});

router.post('/', fileUpload.single('image'), async (req, res) => {
    // Single Image
    // console.log(req.file);
    // Multiple Images
    // console.log(req.files);
    // console.log('Body: ', req.body);

    const createdModelImage = new modelImage({
        name: req.body.name,
        imageProfile: req.file.path,
        images: []
    });
    try {
        await createdModelImage.save();
        // console.log(createdModelImage);
    } catch (err) {
        console.log('Cant not save in database. ');
    }

    console.log('success');

    const data = { id: createdModelImage._id ,name: createdModelImage.name, imageProfile: createdModelImage.imageProfile };

    res.status(200).json(data);
});

router.post('/multipleImg/:uid', fileUpload.array('image', 2), async (req, res) => {
    console.log(req.files);
    // console.log(req.params.uid);

    let detailUser;
    try {
        detailUser = await modelImage.findById({_id: req.params.uid});
    } catch (error) {
        console.log('cant find userId');
    }

    let arrImages = []
    try {
        for(var i=0; i < req.files.length; i++) {
            arrImages[i] = req.files[i].path;  
            // detailUser.images[i].append(req.files[i].path)
        }
        detailUser.images = arrImages
        detailUser.save();
    } catch (error) {
        console.log('cant save Data into database. ');
    }

    // console.log(detailUser);

    res.status(200).json({images: detailUser.images});


})

router.patch("/images", async (req, res) => {
    console.log(req.body);

    let imagesIndex;
    let arrImages = [];
    try {
        imagesIndex = await modelImage.findById({ _id: req.body.uid });
        // console.log(imagesIndex.images.length)
    } catch (error) {
        console.log('cant find userId');
    }

    for(var i=0; i < imagesIndex.images.length; i++) {
        if(imagesIndex.images[i] === req.body.imageId) {
            // console.log('fouud: ', imagesIndex.images[i]);
            fs.unlink(imagesIndex.images[i], (err) => {
                if(!err) console.log('delete images in array success');
                else console.log('cant delete images in array');
            })
        } else{
            arrImages.push(imagesIndex.images[i]);
            // console.log('Not found images id');

        }
    }
    try {
    imagesIndex.images = arrImages;
    await imagesIndex.save();
    } catch (error) {
        console.log('cant save data');
    }
    console.log(imagesIndex);

    res.status(200).json(imagesIndex);
})

router.delete("/:id", async (req, res) => {
    const findData = await modelImage.findById({_id: req.params.id});
    const pathImage = findData.imageProfile;
    try {
        findData.remove();
    } catch (error) {
        console.log('cant remove from database');
    }

    fs.unlink(pathImage, (err) => {
        if(!err) console.log('Delete image success');
        else console.log('cant delete image');
    })
})


module.exports = router;
