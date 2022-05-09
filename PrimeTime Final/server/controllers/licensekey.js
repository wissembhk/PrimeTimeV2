import licensekey from '../models/licensekey.js'


function makeid() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i=0;i<4;i++)
    {
        for ( var j = 0; j<4; j++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
         }
        result+="-"
    }
   return result.slice(0, -1);
}

export const createLicenseKey = async (req, res) => {
    const license_key = req.body;
    const newLicenseKey = new licensekey({ ...license_key })
    newLicenseKey.license_key=makeid();
    try {
        console.log(newLicenseKey)
       await newLicenseKey.save();

        res.status(200).json(newLicenseKey );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}