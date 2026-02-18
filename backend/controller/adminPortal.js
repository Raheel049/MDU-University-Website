import { request, response } from "express";
import addCourseModel from "../models/addCourseSchema.js";
import addStudentModel from "../models/addStudentSchema.js";
import addTeacherModel from "../models/addTeacherSchema.js";
import admissionFormModel from "../models/admissionFormSchema.js";
import bcrypt from "bcrypt";


export const verifyAdmission = async (request, response) => {
  try {
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({
        message: "Required fields are missing",
        data: null,
        status: false,
      });
    }

    const studentData = await admissionFormModel.findOne({ email });
    console.log("data", studentData);

    if (!studentData) {
      return response.status(404).json({
        message: "Student not found",
        data: null,
        status: false,
      });
    }

    response.status(200).json({
      message: "Student Found",
      data: studentData,
      status: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "some thing went wrong",
      data: null,
      status: false,
    });
  }
};

export const addStudent = async (request, response) => {
  try {
    const {
      name,
      fatherName,
      email,
      phone,
      studentID,
      department,
      batch,
      semester,
      password,
    } = request.body;

    if (
      !name ||
      !fatherName ||
      !email ||
      !phone ||
      !studentID ||
      !department ||
      !batch ||
      !semester ||
      !password
    ) {
      return response.status(400).json({
        message: "Required fields are missing",
        data: null,
        status: false,
      });
    }

    const isExists = await addStudentModel.findOne({ email });

    if (isExists) {
      return response.status(401).json({
        message: "Email already Exists",
        data: null,
        status: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newStudent = {
      ...request.body,
      password: hashPassword,
    };

    await addStudentModel.create(newStudent);
    await admissionFormModel.findOneAndUpdate({ email }, { status: "true" });

    return response.status(201).json({
      message: "Student Registered Successfully!",
      data: newStudent,
      status: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal server error",
      data: null,
      status: false,
    });
  }
};

export const getStudentStats = async (request, response) => {
  try {
    // Database mein total records count karne ka function
    const totalStudents = await addStudentModel.countDocuments();

    return response.status(200).json({
      success: true,
      count: totalStudents,
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const getStudentData = async (request, response) => {
  try {
    const students = await addStudentModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5);
    response.status(200).json({
      message: "Data Fetch Successfully",
      data: students,
      status: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal server error",
      data: null,
      status: false,
    });
  }
};

export const addCourse = async (request, response) => {
  try {
    const {
      courseName,
      courseCode,
      creditHours,
      department,
      semester,
      courseType,
      assignedTeacher,
    } = request.body;

    // 🔹 Required fields check
    if (
      !courseName ||
      !courseCode ||
      !creditHours ||
      !department ||
      !semester ||
      !assignedTeacher
    ) {
      return response.status(400).json({
        message: "Required fields are missing",
        data: null,
        status: false,
      });
    }

    // 🔹 Duplicate check
    const isExists = await addCourseModel.findOne({ courseCode });
    if (isExists) {
      return response.status(409).json({
        message: "This course already exists",
        data: null,
        status: false,
      });
    }

    // 🔹 Create course
    const course = await addCourseModel.create({
      courseName,
      courseCode,
      creditHours,
      department,
      semester,
      courseType,
      assignedTeacher,
    });

    return response.status(201).json({
      message: "Course added successfully",
      data: course,
      status: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal server error",
      data: null,
      status: false,
    });
  }
};

export const getCourseCount = async (request, response) => {
  try {
    const totalCourses = await addCourseModel.countDocuments();

    return response.status(200).json({
      status: true,
      count: totalCourses,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal server error",
      data: null,
      status: false,
    });
  }
};

export const addTeacher = async (request, response) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      designation,
      department,
      qualification,
      experience,
      joiningDate,
      salary,
      password,
    } = request.body

    if(
      !name ||
      !email ||
      !phoneNumber ||
      !designation ||
      !department ||
      !qualification ||
      !experience ||
      !joiningDate ||
      !salary ||
      !password 
    ){
      return response.status(400).json({
        message : "Required fields are missing!",
        data : null,
        status : false
      })
    }


    const isExists = await addTeacherModel.findOne({email})

    if(isExists){
      return response.status(401).json({
        message : "Email already exists!",
        data : null,
        status : false
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const teacherObj = {
      ...request.body,
      password : hashPassword
    }

    await addTeacherModel.create(teacherObj);

    console.log(teacherObj);

    response.status(201).json({
      message : "Teacher Registered successfully!",
      data : teacherObj,
      status : true
    });

  } catch (error) {
    return response.status(500).json({
      message : error.message || "Internal server error",
      data : null,
      status : false
    })
  }
};

export const teacherCount = async (request, response) => {
  try {
    const totalTeacher = await addTeacherModel.countDocuments();

    return response.status(200).json({
      count : totalTeacher,
      status : true
    })
  } catch (error) {
   return response.status(500).json({
      message : error.message || "Internal server error",
      data : null,
      status : false
    });
  }
};

export const allStudents = async (request,response) => {
  try {
    const allStudents = await addStudentModel.find();
    response.status(201).json({
      message : "All students are fetched",
      status : true,
      data : allStudents,
    
    })
  } catch (error) {
    return response.status(5000).json({
      message : error.message || "Internal server error",
      status : false,
      data : null
    })
  }
}

export const dropStudent = async (request, response) => {
  try {
    
    const { id } = request.params
    const deleteStudent = await addStudentModel.findByIdAndDelete(id)

    if(!deleteStudent){
      return response.status(404).json({
        message : error.message || "Student not found",
        status : false,
        data : null
      });
    }

    response.status(200).json({
      message : "Student drop successful",
      status : true,
    })
  } catch (error) {
    return response.status(500).json({
      message : error.messsage || "Internal Server Error",
      status : false,
      data : null
    });
  }
}

export const allCourses = async (request, response) => {
  try {
    const allCourses = await addCourseModel.find();

    response.status(200).json({
      message : "All courses are fetched",
      status : true,
      data : allCourses
    });
  } catch (error) {
    return response.status(500).json({
      message : error.message || "Internal Server Error",
      status : false,
      data : null
    })
  }
}
