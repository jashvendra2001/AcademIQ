import { Course } from "../models/course.models.js";
import { uploadResponse } from "../utils/cloudinary.js";
export const courseSchema = async (req, res) => {
  const { courseTitle, description, coursePrice = "13243242323" } = req.body;
  console.log(courseTitle, description);
  if (!courseTitle || !description || !coursePrice) {
    return res.status(400).json({
      success: false,
      message: "all fields are required",
    });
  }

  const createCourse = await Course.create({
    courseTitle,
    description,
    coursePrice,
    creator: req.id,
  });

  return res.status(200).json({
    success: true,
    message: "course create successfully",
    createCourse,
  });
};

export const searchCourse = async (req, res) => {
  try {
    const { query = "", categories = [], sortByPrice = "" } = req.query;

    console.log(categories);

    // desugn a query

    const searchQuery = {
      isPublice: true,

      $or: [
        {
          courseTitle: { $regex: query, $option: "i" },
        },
        {
          subTitle: { $regex: query, $option: "i" },
        },
        {
          category: { $regex: query, $option: "i" },
        },
      ],
    };

    if (categories.length > 0) {
      searchQuery.category = { $in: categories };
    }

    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1; //sort by price in ascending
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1; // descending
    }

    const courses = await Course.find(searchQuery)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      courses: courses || [],
    });
  } catch (error) {
    console.log(error);
  }
};

export const publishedCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });

    if (!courses) {
      return res.status(401).json({
        success: false,

        message: "course is not available",
      });
    }

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "course found successfully",
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};
export const editCreatorCourse = async (req, res) => {
  const reqId = req.params.id;
  const profilePhoto = req?.file?.path || req?.file;
  console.log(`Updating Course with ID: ${reqId}`);
  console.log("Uploaded File:", req.file);
  console.log("Request Body:", req.body);

  // Destructuring fields from request body
  const {
    courseTitle,
    subTitle,
    description,
    category,
    courseLevel,
    coursePrice,
  } = req.body;

  // Validate that all fields are present
  if (
    !courseTitle ||
    !subTitle ||
    !description ||
    !category ||
    !courseLevel ||
    !coursePrice
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    // Upload thumbnail to Cloudinary (or similar service)
    let uploadthumbnail = null;
    if (profilePhoto) {
      uploadthumbnail = await uploadResponse(profilePhoto); // Example function for file upload
    }

    // Prepare data for update
    const editData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: uploadthumbnail.secure_url, // Updated file path
    };

    // Find and update the course data
    const data = await Course.findByIdAndUpdate(reqId, editData, {
      new: true,
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Course not found or update failed.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course data has been updated successfully.",
      data,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

export const getDatabyId = async (req, res) => {
  const courseId = req.params.id;

  const courseByID = await Course.find({
    _id: courseId,
  });
  if (!courseByID) {
    return res.status(400).jsoon({
      success: false,
      message: "course not getting",
    });
  }

  return res.status(200).json({
    success: true,
    message: "course found successfully",
    courseByID,
  });
};
