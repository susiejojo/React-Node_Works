var fs=require('fs');
fs.rename('newfile.txt','new.txt',function(err){
	if (err) throw err;
	console.log('Renamed!');
});