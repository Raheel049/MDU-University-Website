import addStudentModel from "../models/addStudentSchema.js";
import admissionFormModel from "../models/admissionFormSchema.js";
import questionSchemaModel from "../models/questionSchema.js";
import jwt from "jsonwebtoken"
import userModel from "../models/userSchema.js";

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
      !name ||
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
      !interPercentage
    ) {
      return response.status(400).json({
        message: "Required fields are missing",
        status: false,
        data: null,
      });
    }

    const stuData = await admissionFormModel.findOne({ email });

    if (stuData) {
      return response.status(401).json({
        message: "Already admission Form submitted",
        status: false,
        data: null,
      });
    }

    const admissionDataObj = {
      ...request.body,
    };

    await admissionFormModel.create(admissionDataObj);

    response.status(200).json({
      message: "SuccessFully Submited",
      status: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Some thing went wrong",
      status: false,
      data: null,
    });
  }
};

export const examQuestions = async (request, response) => {
  try {
   
    const questions = await questionSchemaModel.find().select("-correctAns")

    response.status(200).json({
      message : "Questions Founded",
      data : questions,
      status : true
    })
  } catch (error) {
    return response.status(500).json({
      message: error.message || "some thing went wrong",
      status: false,
      data: null,
    });
  }
};



export const submitExam = async (request, response) => {
  try {
    const { answers } = request.body;

    const authHeader = request.headers.authorization

    if(!authHeader){
      return response.status(400).json({
        message : "Required fields are missing",
        data : null,
        status : false
      })
    }

    const token = authHeader.split(" ")[1]

    const userId = jwt.verify(token, process.env.PRIVATE_KEY)

    console.log(userId.id)
    const userOnlyId = userId.id

    const user = await userModel.findById(userOnlyId);
    const userEmail = user.email
    
    // const studentData = await addStudentModel.findOneAndUpdate({userEmail : userEmail}, {attamptEntryTest : true})
    const studentData = await addStudentModel.findOne({userEmail : userEmail})

    console.log(studentData)

    


    // 1. Database se saare questions mangwao
    const QuestionDB = await questionSchemaModel.find();
    

    // 2. Dynamic Length Check
    const objLength = Object.keys(answers || {}).length;

    if (objLength !== QuestionDB.length) {
      return response.status(400).json({
        message: `Attempt ${QuestionDB.length} All the Questions!`,
        data: null,
        status: false
      });
    }

    var totalMarks = 0;
    var obtainMarks = 0;

    // 3. Marks Calculation Loop
    QuestionDB.forEach((question) => {
      // Sawal ke apne marks lo (agar nahi hain to 1 maan lo)
      const currentQuesMarks = question.marks || 1;
      totalMarks += currentQuesMarks;

      const stuSelectedAns = answers[question._id.toString()];

      // Agar student ka jawab sahi hai, to us sawal ke marks add karo
      if (stuSelectedAns === question.correctAns) {
        obtainMarks += currentQuesMarks; 
      }
    });

    await 

    

    // 4. Final Response
    response.status(200).json({
      message: "Your Result is Ready!",
      status: true,
      data: {
        totalMarks,
        obtainMarks,
        percentage: ((obtainMarks * 100) / totalMarks).toFixed(2) + "%" 
      }
    });

    console.log(totalMarks,obtainMarks);

  } catch (error) {
    return response.status(500).json({
      message: error.message || "Something went wrong",
      status: false,
      data: null,
    });
  }
};