import {createContext} from "react";

export const dashContext = createContext({
    currentPage:1,
    setCurrentPage:()=>{},
    perPage:5,
    setPerPage:()=>{},
    handlePageChange:()=>{},
    currentCourse:{},
    setSearch:()=>{},
    openNewCourseDialog :()=>{},
    openEditCourseDialog :()=>{},
    openDeleteCourseDialog :()=>{},
    courseData:[],
    filteredCourse:[],
    sortCoursesAsc:()=>{},
    sortCoursesDes:()=>{},
    validator:null,
})