var s3Uploader = (function () {

    var s3URI = encodeURI("https://YOUR_S3_BUCKET_NAME.s3.amazonaws.com/"),
        policyBase64 = "eyJleHBpcmF0aW9uIjoiMjAyMC0xMi0zMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W3siYnVja2V0IjoiQVJUMzAwVGVzdCJ9LFsic3RhcnRzLXdpdGgiLCIka2V5IiwiIl0seyJhY2wiOiJwdWJsaWMtcmVhZCJ9LFsic3RhcnRzLXdpdGgiLCIkQ29udGVudC1UeXBlIiwiIl0sWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCw1MjQyODgwMDBdXX0=",
        signature = "7cpYi9ELPQtqhMArLcwUKpeBkEw=",
        awsKey = 'AKIAJXESRTHA5IQ4SC5Q',
        acl = "public-read";

    function upload(imageURI, fileName) {

        var deferred = $.Deferred(),
            ft = new FileTransfer(),
            options = new FileUploadOptions();

        options.fileKey = "file";
        options.fileName = fileName;
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.params = {
            "key": fileName,
            "AWSAccessKeyId": awsKey,
            "acl": acl,
            "policy": policyBase64,
            "signature": signature,
            "Content-Type": "image/jpeg"
        };

        ft.upload(imageURI, s3URI,
            function (e) {
                deferred.resolve(e);
            },
            function (e) {
                deferred.reject(e);
            }, options);

        return deferred.promise();

    }

    return {
        upload: upload
    }

}());