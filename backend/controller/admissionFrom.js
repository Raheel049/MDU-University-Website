import admissionFormModel from "../models/admissionFormSchema.js";

export const admissionFrom = async (request, response) => {
  try {
    const {
      name,
      email,
      phone,
      fatherName,
      address,
      city,
      province,
      matricTotal,
      matricObtained,
      matricPercentage,
      interTotal,
      interObtained,
      interPercentage,
    } = request.body;

    if (
      (!name ||
      !phone ||
      !email ||
      !fatherName ||
      !address ||
      !city ||
      !province ||
      !matricTotal ||
      !matricObtained ||
      !matricPercentage ||
      !interTotal ||
      !interObtained ||
      !interPercentage)
    ) {
      return response.status(400).json({
        message: "Required fields are missing",
        status: false,
        data: null,
      });
    }

    const stuData = await admissionFormModel.findOne({email})

    if(stuData){
        return response.status(401).json({
            message : "Already admission Form submitted",
            status : false,
            data : null
        })
    }

    const admissionDataObj = {
        ...request.body
    }

    await admissionFormModel.create(admissionDataObj);

    response.status(200).json({
        message : "SuccessFully Submited",
        status : true,

    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || "Some thing went wrong",
      status: false,
      data: null,
    });
  }
};
