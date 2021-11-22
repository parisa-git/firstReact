import React, {useEffect, useRef, useState} from "react";
import {dashContext} from "./DashContext";
import {orderBy} from "lodash";
import {paginate} from "../../utils/paginate";
import NewCourseDialog from "../admin/dailogs/newCourseDialog";
import EditCourseDialog from "../admin/dailogs/EditCourseDialog";
import DeleteCourseDialog from "../admin/dailogs/DeleteCourseDialog";
import SimpleReactValidator from "simple-react-validator";

const AdminContext = ({courses,children}) =>{

    const [perPage] = useState(5);
    const [currentCourse, setCurrentCourse] = useState({});
    const [courseList, setCourseList] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [newCourseDialog,setNewCourseDialog]=useState(false);
    const [editCourseDialog,setEditCourseDialog]=useState(false);
    const [deleteCourseDialog,setDeleteCourseDialog]=useState(false);

    useEffect(() => setCourseList(courses), [courses]);

    const openEditCourseDialog = (course)=> {
        setEditCourseDialog(true);
        setCurrentCourse(course);
    }
    const closeEditCourseDialog = ()=> setEditCourseDialog(false);

    const openNewCourseDialog = ()=> setNewCourseDialog(true);

    const closeNewCourseDialog = ()=> setNewCourseDialog(false);

    const openDeleteCourseDialog = (course)=> {
        setDeleteCourseDialog(true);
        setCurrentCourse(course);
    }
    const closeDeleteCourseDialog = ()=> setDeleteCourseDialog(false);


    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const filteredCourses = courseList.filter((course) =>
        course.title.includes(search)
    );

    const sortCoursesAsc = () => {
        setCourseList(orderBy(courseList, "price", "asc"));
    };

    const sortCoursesDes = () => {
        setCourseList(orderBy(courseList, "price", "desc"));
    };

    const courseData = paginate(filteredCourses, currentPage, perPage);

    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "پر کردن این فیلد الزامی میباشد",
                min: "کمتر از 5 کاراکتر نباید باشد",
                email: "ایمیل نوشته شده صحیح نمی باشد",
                integer:"قیمت باید عدد باشد"
            },
            element: message => <div style={{ color: "red" }}>{message}</div>
        })
    );


    return(
        <dashContext.Provider
        value={{
         currentPage,
         perPage,
         setCurrentPage,
         handlePageChange,
         courseData,
         openNewCourseDialog,
         openEditCourseDialog,
         openDeleteCourseDialog,
         setSearch,
         filteredCourses,
         sortCoursesAsc,
         sortCoursesDes,
         validator,
        }}
        >
            <NewCourseDialog showDialog={newCourseDialog} closeDialog={closeNewCourseDialog} />
            <EditCourseDialog showDialog={editCourseDialog} closeDialog={closeEditCourseDialog} course={currentCourse} />
            <DeleteCourseDialog showDialog={deleteCourseDialog} closeDialog={closeDeleteCourseDialog} course={currentCourse} />
            {children}
        </dashContext.Provider>
    );

 }

 export default AdminContext;