var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');
var passport = require('passport');


var Event = mongoose.Event;
var Result = mongoose.Result;
var Register = mongoose.Register;
var Course = mongoose.Course;
var Contact = mongoose.Contact;
var User = mongoose.User;




var result = [];



var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
	}
});

var fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  	cb(null, true);
  } else {
  	cb(null, false);
  }
};




var upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});                                     //.array('coverphoto',2);

var Register = require('../models/register');
var Result = require('../models/result');
var Center = require('../models/center');
var Event = require('../models/event');
var Course = require('../models/course');
var Contact = require('../models/contact');
var User = require('../models/user');




router.get('/', function(req, res, next){
	Event.find()
	.then(function(doc){
		 Center.find()
 .then(function(doc2){
		res.render('user/home', {centerers: doc2, coverers: doc , title: 'Uma Technical Electronic Institute'});
	});
	});
});


router.get('/user/showregistera', isLoggedIn, function(req, res, next){
	Register.find()
	.then(function(doc){
		 Center.find()
 .then(function(doc2){
		res.render('user/showregister', {centerers: doc2, infos: doc , title: 'Show Register'});
	});
	});
});

router.get('/user/showuploadresulta', isLoggedIn, function(req, res, next){
	Result.find()
	.then(function(doc){
		 Center.find()
 .then(function(doc2){
		res.render('user/showuploadresult', {centerers: doc2, resulters: doc , title: 'Show Upload Result'});
	});
	});
});

router.get('/user/showcontact', isLoggedIn, function(req, res, next){
	Contact.find()
	.then(function(doc){
		 Center.find()
 .then(function(doc2){
		res.render('user/showcontactusList', {centerers: doc2, contactform1: doc , title: 'Show Contact Us List'});
	});
	});
});



router.get('/user/shownewsa', isLoggedIn, function(req, res, next){
	Event.find()
	.then(function(doc){
		 Center.find()
 .then(function(doc2){
		res.render('user/shownews', {centerers: doc2, coverers: doc , title: 'Show News / Cover Image'});
	});
	});
});

router.get('/showcenters', isLoggedIn, function(req, res, next){
	Center.find()
	.then(function(doc){
		res.render('user/showcenter', {centerers: doc , title: 'Show Centers'});
	});
});



router.get('/registrationForm', function(req, res, next){
	Course.find()
	.then(function(doc1){
            Center.find()
  .then(function(doc){
      Center.find()
 .then(function(doc2){
    res.render('user/registration',{regist761: doc , regist: doc1, centerers: doc2,  title: 'Registration Form'} );

 });
  });

	});
});


router.get('/centers', function(req, res, next){
	Center.find()
	.then(function(doc){
		res.render('user/contactus', {centerers: doc , title: 'Center Information'});
	});
});


router.get('/contactUs', function(req, res, next){
	Contact.find()
	.then(function(doc){
		  Center.find()
 .then(function(doc2){
		res.render('user/contactform', {contactform1: doc , centerers: doc2, title: 'Contact Us'});
	});
	});
});



router.get('/courses', function(req, res, next){
	Course.find()
	.then(function(doc){
		 Center.find()
 .then(function(doc2){
		res.render('user/courses', {regist: doc , centerers: doc2, title: 'Courses Information'});
	});
	});
});

router.get('/showcourse', isLoggedIn, function(req, res, next){
	Course.find()
	.then(function(doc){
		 Center.find()
 .then(function(doc2){
		res.render('user/showcourses', {centerers: doc2, regist: doc , title: 'Show Courses'});
	});
	});
});

router.get('/adminsettings', function(req, res, next){
	User.find()
	.then(function(doc){
		 Center.find()
 .then(function(doc2){
		res.render('user/adminsettings', {centerers: doc2, userers: doc , title: 'Show Registered Admin Users'});
	});
	});
});


router.get('/user/aboutus', function(req, res, next) {
	 Center.find()
 .then(function(doc2){
	res.render('user/aboutus', {centerers: doc2, title: 'About Us' });
});
});

router.get('/user/general', function(req, res, next) {
	 Center.find()
 .then(function(doc2){
	res.render('user/general', {centerers: doc2, title: 'Admission Rules' });
});
});

router.get('/user/training', function(req, res, next) {
	 Center.find()
 .then(function(doc2){
	res.render('user/training', {centerers: doc2, title: 'Training Rules' });
});
});


router.get('/user/result', function(req, res, next) {
	 Center.find()
 .then(function(doc2){
	res.render('user/result', {centerers: doc2, title: 'Result Search' });
});
});


router.get('/user/getresult', function(req, res, next) {
	 Center.find()
 .then(function(doc2){
	res.render('user/getresult', {centerers: doc2, title: 'Get Result' });
});
});


// POST METHODS


router.post('/user/getresults', function(req, res){
	const id = req.params; 
	console.log("inside post"+ "id = " + req.body.rollnumber);
Center.find(function(err, doc2){
	Result.find({rrollnumber:req.body.rollnumber, rdob:req.body.dob}, function(err, result){
		if(err){
			console.log(err);
			return res.redirect('/');console.log(err);

		} else{
			console.log("inside else" + " " +res);
			res.render('user/getresult', {result : result , centerers: doc2 });
			console.log("result"+ " " +result);
		}
	});
});


});

// POST Method for contact us form

router.post('/user/contactUs' , function(req, res, next){

	var contactform2 = { yourName: req.body.yourName,
		yourMobile: req.body.yourMobile,
		yourEmail: req.body.yourEmail,
		yourBranch: req.body.yourBranch,
		yourAddress: req.body.yourAddress,
		yourFeedback: req.body.yourFeedback
	};

	var data12 = new Contact(contactform2);
	data12.save();
	console.log(req.body);
	console.log(req.file);

	res.redirect('/contactUs');

});


//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

router.post('/registrationForm', function(req, res, next){

	var info = { branch: req.body.branch,
		course: req.body.course,
		training: req.body.training,
		fullname: req.body.fullname,
		qualification: req.body.qualification,
		dob: req.body.dob,
		email: req.body.email,
		address: req.body.address,
		contact: req.body.contact
	};

	req.checkBody('fullname', 'Enter valid fullname').notEmpty().isLength({ min: 4 , max:100});
	req.checkBody('dob', 'Invalid dateofbirth').notEmpty().isBefore();
	req.checkBody('email', 'Enter a valid email address.').notEmpty().isEmail();
	req.checkBody('address', 'Enter a valid address.').notEmpty().isLength({ min: 4 , max:100});
	req.checkBody('contact', 'Invalid contact').notEmpty().isMobilePhone("en-IN").isNumeric().isLength({ min: 10 , max:10});
	

	var errors = req.validationErrors();
	var messages = req.flash('error');

	if (errors) {
		var messages = [];
		errors.forEach(function(error) {
			messages.push(error.msg);
		});

		res.render('user/registration', {  messages: messages , hasErrors: messages.length > 0});
		return;
	}

	var data = new Register(info);
	data.save();
	console.log(req.body);
	console.log(req.file);

	res.redirect('/');

});

/* admin post methods ADD COVER */


 //   router.post('/upload', upload.multer({...}).array(...), function(req, res, next) {

 //var upload = multer({})


 router.post('/user/addcover', upload.single('coverphoto') , function(req, res, next){
 	console.log(req.body);
 	console.log(req.file);


 	const coverer = {
 		_id: new mongoose.Types.ObjectId(),
 		covertext: req.body.covertext,
 		activeOrNot: req.body.activeOrNot
 	};

   if(req.file != "" && req.file != undefined){
coverer.coverphoto = req.file.path;
} 
if(req.file != "" && req.file != undefined) {
errors = true;
}





 	req.checkBody('covertext', 'Enter cover news or event').notEmpty();
 	req.checkBody('activeOrNot', 'Enter image is active or not').notEmpty();

 	var errors = req.validationErrors();
 	var messages = req.flash('error');

 	if (errors) {
 		var messages = [];
 		errors.forEach(function(error) {
 			messages.push(error.msg);
 		});

 		res.render('user/addcover', {  messages: messages , hasErrors: messages.length > 0});
 		return;
 	}

 	const event1 = new Event(coverer);
 	event1.save(); 	
 	res.redirect('/user/addcover');  

 });

 /* ADD CENTERS Post Method   */

 router.post('/user/addcenter', upload.single('centerimage'), function(req, res, next){
 	console.log(req.body);
 	console.log(req.file);

 	const centerer = {
 		centername: req.body.centername,
 		centermobile: req.body.centermobile,
 		centerphone: req.body.centerphone,
 		centeremail: req.body.centeremail,
 		directorname: req.body.directorname,
 		centerlandmark: req.body.centerlandmark,
 		centeraddress: req.body.centeraddress,
 		centerimage: req.file.path
 	};

 	req.checkBody('centername', 'Enter center name').notEmpty().isLength({ min: 3 , max:100});
 	req.checkBody('centermobile', 'Enter a valid mobile number.').notEmpty().isMobilePhone("en-IN").isNumeric();
 	req.checkBody('centerphone', 'Enter a valid phone number.').notEmpty().isNumeric().isMobilePhone("en-IN").isLength({ min: 10 , max:10});
 	req.checkBody('centeraddress', 'Enter center address').notEmpty().isLength({ min: 10 , max:300});
 	req.checkBody('centeremail', 'Enter a valid email address.').notEmpty().isEmail();


 	var errors = req.validationErrors();
 	var messages = req.flash('error');

 	if (errors) {
 		var messages = [];
 		errors.forEach(function(error) {
 			messages.push(error.msg);
 		});

 		res.render('user/addcenter', {  messages: messages , hasErrors: messages.length > 0});
 		return;
 	}


 	const event2 = new Center(centerer);
 	event2.save();
 	

 	res.redirect('/user/addcenter');

 });


 /* ADD UPLOAD RESULT Post Method   */

 router.get('/user/uploadresult', isLoggedIn , function(req, res, next) {
 	res.render('user/uploadresult', { title: 'Upload Result' });
 });

 var resultImages = upload.fields([{
 	name: 'uploadmarksheet', maxCount: 1
 }, {
 	name: 'uploadcertificate', maxCount: 1
 }]);

 router.post('/user/uploadresult', resultImages, function(req, res, next){
 	console.log(req.body);
 	console.log(req.files);

 	const resulter = {
 		rstudentname: req.body.rstudentname,
 		rdob: req.body.rdob,
 		rdoj: req.body.rdoj,
 		rcourse: req.body.rcourse,
 		rfathername: req.body.rfathername,
 		rrollnumber: req.body.rrollnumber,
 		ryear: req.body.ryear
 	};


if(req.files['uploadmarksheet'] != "" && req.files['uploadmarksheet'] != undefined){
resulter.uploadmarksheet = req.files['uploadmarksheet'][0].path;
}
if(req.files['uploadcertificate'] != "" && req.files['uploadcertificate'] != undefined){
resulter.uploadcertificate = req.files['uploadcertificate'][0].path;
} 
if((req.files['uploadcertificate'] != "" && req.files['uploadcertificate'] != undefined) && 
(req.files['uploadmarksheet'] != "" && req.files['uploadmarksheet'] != undefined)) {
errors = true;
}


 	req.checkBody('rstudentname', 'Enter a valid student name.').notEmpty().isLength({ min: 3 , max:20});
 	req.checkBody('rrollnumber', 'Enter a 8 digits valid roll number like MRJ12345.').notEmpty().isAlphanumeric().isLength({ min: 4 , max:8});
 	req.checkBody('ryear', 'Enter a valid year, like 2018.').notEmpty().isNumeric().isLength({ min: 4 , max:4});
 	req.checkBody('rdob', 'Enter a valid date of birth. ').notEmpty();
 	req.checkBody('rdoj', 'Enter a valid date of joining.').notEmpty();



 	var errors = req.validationErrors();
 	var messages = req.flash('error');

 	if (errors) {
 		var messages = [];
 		errors.forEach(function(error) {
 			messages.push(error.msg);
 		});

 		res.render('user/uploadresult', {  messages: messages , hasErrors: messages.length > 0});
 		return;
 	}

 	const result = new Result(resulter);
 	result.save();
 	

 	res.redirect('/user/uploadresult');

 });


 /* ADD COURSE Post Method   */

 router.post('/user/addcourse', function(req, res, next){
 	console.log(req.body);

 	const regists = {
 		maincoursename: req.body.maincoursename,
 		subcoursename: req.body.subcoursename,
 		tsc: req.body.tsc,
 		tfscn: req.body.tfscn,
 //		bcn: req.body.bcn,
 		td1: req.body.td1,
 		td2: req.body.td2,
 		td3: req.body.td3,
 		td4: req.body.td4
 	};


 	req.checkBody('subcoursename', 'Enter valid sub course name').notEmpty().isLength({ min: 3 , max:100});

 	var errors = req.validationErrors();
 	var messages = req.flash('error');

 	if (errors) {
 		var messages = [];
 		errors.forEach(function(error) {
 			messages.push(error.msg);
 		});

 		res.render('user/addcourse', {  messages: messages , hasErrors: messages.length > 0});
 		return;
 	}


 	const event5 = new Course(regists);
 	event5.save();
 	

 	res.redirect('/user/addcourse');

 });



 /* EDIT OR DELETE METHODS */

 router.get('/registers/:id', function(req, res){
 	Register.findById(req.params.id, function(err, infoss){
//console.log(infoss);
//return;
res.render('user/register', {infoss: infoss});
});

 });

 /* EDIT*/

 router.get('/registers/edit/:id', function(req, res){
 	Register.findById(req.params.id, function(err, infoss){
//console.log(infoss);
//return;
res.render('user/edit_register', {infoss: infoss});
});

 });


 /* EDIT SHOW UPLOAD RESULT - GET ID , GET EDIT VIEW , POST EDIT UPDATE , DELETE */

 router.get('/showresults/:id', function(req, res){
 	Result.findById(req.params.id, function(err, infoss4){
//console.log(infoss4);
//return;
res.render('user/showresult', {infoss4: infoss4});
});

 });


 router.get('/showresults/edit/:id', function(req, res){
 	Result.findById(req.params.id, function(err, infoss4){
//console.log(infoss4);
//return;
res.render('user/edit_showresult', {infoss4: infoss4});
});

 });


 router.post('/user/showresult/edit/:id', resultImages, function(req, res){
 	var infoss4 = {};
 	infoss4.rstudentname = req.body.rstudentname;
 	infoss4.rdob = req.body.rdob;
 	infoss4.rdoj = req.body.rdoj;
 	infoss4.rcourse = req.body.rcourse;
 	infoss4.rfathername = req.body.rfathername;
 	infoss4.rrollnumber = req.body.rrollnumber;
 	infoss4.ryear = req.body.ryear;
 


if(req.files['uploadmarksheet'] != "" && req.files['uploadmarksheet'] != undefined){
infoss4.uploadmarksheet = req.files['uploadmarksheet'][0].path;
}
if(req.files['uploadcertificate'] != "" && req.files['uploadcertificate'] != undefined){
infoss4.uploadcertificate = req.files['uploadcertificate'][0].path;
} 
if((req.files['uploadcertificate'] != "" && req.files['uploadcertificate'] != undefined) && 
(req.files['uploadmarksheet'] != "" && req.files['uploadmarksheet'] != undefined)) {
errors = true;
}



 	var query = {_id:req.params.id}
 	

 	Result.update(query, infoss4, function(err){
 		if(err){
 			console.log(err);
 			return;
 		} else {
 			res.redirect('/user/showuploadresulta');
 		}
 	});

 });

 router.delete('/showresults/:id', function(req, res){
 	
 	var query = {_id:req.params.id}

 	Result.remove(query, function(err){
 		if(err){
 			console.log(err);
 		}
 		res.send('Success');
 	});
 	
 });



 /* Update Register */

 router.post('/user/register/edit/:id', function(req, res){
 	var infoss = {};
 	infoss.branch = req.body.branch;
 	infoss.course = req.body.course;
 	infoss.training = req.body.training;
 	infoss.fullname = req.body.fullname;
 	infoss.qualification = req.body.qualification;
 	infoss.dob = req.body.dob;
 	infoss.email = req.body.email;
 	infoss.address = req.body.address;
 	infoss.contact = req.body.contact;

 	var query = {_id:req.params.id}
 	

 	Register.update(query, infoss, function(err){
 		if(err){
 			console.log(err);
 			return;
 		} else {
 			res.redirect('/user/showregistera');
 		}
 	});

 });

 /* Delete Register */

//router.get('registers/:id', function(req, res))


router.delete('/registers/:id', function(req, res){
	
	var query = {_id:req.params.id}

	Register.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	});
	
});


// centerdetail or contact us


router.get('/centerdetails/:id', function(req, res){
	Center.find(function(err, doc2){
	Center.findById(req.params.id, function(err, infoss1){
//console.log(infoss);
//return;
res.render('user/centerdetail', {centerers: doc2, infoss1: infoss1});
});

});

});


router.get('/coursedetails/:id', function(req, res){
	Center.find(function(err, doc2){
	Course.findById(req.params.id, function(err, infoss2){
//console.log(infoss);
//return;
res.render('user/coursedetail', {centerers: doc2, infoss2: infoss2});
});

});
	
});


router.get('/coursedetails1/:id', function(req, res){
	Course.findById(req.params.id, function(err, infoss2){
//console.log(infoss);
//return;
res.render('user/coursedetailAdmin', {infoss2: infoss2});
});

});



router.get('/centerdetails1/:id', function(req, res){
	Center.findById(req.params.id, function(err, infoss1){
//console.log(infoss);
//return;
res.render('user/centerdetailAdmin', {infoss1: infoss1});
});

});


router.get('/coverdetails1/:id', function(req, res){
	Event.findById(req.params.id, function(err, infoss3){
//console.log(infoss);
//return;
res.render('user/coverdetailAdmin', {infoss3: infoss3});
});

});


/* EDIT Course*/

router.get('/coursedetails1/edit/:id', function(req, res){
	Course.findById(req.params.id, function(err, infoss2){
//console.log(infoss);
//return;
res.render('user/edit_course', {infoss2: infoss2});
});

});


/* EDIT Center*/

router.get('/centerdetails1/edit/:id', function(req, res){
	Center.findById(req.params.id, function(err, infoss1){
//console.log(infoss);
//return;
res.render('user/edit_center', {infoss1: infoss1});
});

});


/* EDIT Cover*/

router.get('/coverdetails1/edit/:id', function(req, res){
	Event.findById(req.params.id, function(err, infoss3){
//console.log(infoss);
//return;
res.render('user/edit_cover', {infoss3: infoss3});
});

});


/* Update Course */

router.post('/user/coursedetailAdmin/edit/:id', function(req, res){
	var infoss2 = {};
	infoss2.maincoursename = req.body.maincoursename;
	infoss2.tsc = req.body.tsc;
	infoss2.subcoursename = req.body.subcoursename;
//	infoss2.bcn = req.body.bcn;
	infoss2.td1 = req.body.td1;
	infoss2.td2 = req.body.td2;
	infoss2.td3 = req.body.td3;
	infoss2.td4 = req.body.td4;

	var query = {_id:req.params.id}
	

	Course.update(query, infoss2, function(err){
		if(err){
			console.log(err);
			return;
		} else {
			res.redirect('/showcourse');
		}
	});

});


/* Update Center */

router.post('/user/centerdetailAdmin/edit/:id',  upload.single('centerimage'), function(req, res){
	var infoss1 = {};
	infoss1.centername = req.body.centername;
	infoss1.centermobile = req.body.centermobile;
	infoss1.centerphone = req.body.centerphone;
	infoss1.centeremail = req.body.centeremail;
	infoss1.directorname = req.body.directorname;
	infoss1.centerlandmark = req.body.centerlandmark;
	infoss1.centeraddress = req.body.centeraddress;
	infoss1.centerimage = req.file.path;

	var query = {_id:req.params.id}
	

	Center.update(query, infoss1, function(err){
		if(err){
			console.log(err);
			return;
		} else {
			res.redirect('/showcenters');
		}
	});

});

/* Update Cover */

router.post('/user/coverdetailAdmin/edit/:id',  upload.single('coverphoto'), function(req, res){
	var infoss3 = {};
	
	infoss3.activeOrNot = req.body.activeOrNot;
	infoss3.covertext = req.body.covertext;


   if(req.file != "" && req.file != undefined){
infoss3.coverphoto = req.file.path;
} 
if(req.file != "" && req.file != undefined) {
infoss3 = true;
}

	var query = {_id:req.params.id}
	console.log(req.file);

	Event.update(query, infoss3, function(err){
		if(err){
			console.log(err);
			return;
		} else {
			res.redirect('/user/shownewsa');
		}
	});

});



// delete course


router.delete('/coursedetails1/:id', function(req, res){
	
	var query = {_id:req.params.id}

	Course.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	});
	
});

// delete center 

router.delete('/centerdetails1/:id', function(req, res){
	
	var query = {_id:req.params.id}

	Center.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	});
	
});

// delete cover and news/event 

router.delete('/coverdetails1/:id', function(req, res){
	
	var query = {_id:req.params.id}

	Event.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	});
	
});

// contact us form

router.get('/user/showcontacts/:id', function(req, res){
	Contact.findById(req.params.id, function(err, contactform1){
//console.log(infoss);
//return;
res.render('user/contactformdetail', {contactform1: contactform1});
});

});


router.delete('/showcontacts/:id', function(req, res){
	
	var query = {_id:req.params.id}

	Contact.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	});
	
});

// admin user delete

router.delete('/adminsettings/:id', function(req, res){
	
	var query = {_id:req.params.id}

	User.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	});
	
});




module.exports = router;

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/user/signin');
}


function notLoggedIn (req, res, next) {
	if(!req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}




/*

 GET home page. 

router.get('/', function(req, res, next) {
  res.render('layouts/layout', { title: 'Express' });
});


router.get('/', function(req, res, next) {

res.render('user/home', { title: 'Brand Name' });

});   

router.get('/user/centerinfos',  function(req, res, next){
Center.find()
.then(function(doc){
res.render('user/centerinfo', {centerers: doc});
});
});


*/