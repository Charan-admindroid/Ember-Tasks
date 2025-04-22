/* eslint-disable prettier/prettier */
import Component from "@glimmer/component"
import { tracked } from "@glimmer/tracking"
import {inject as service} from '@ember/service';
import {action} from '@ember/object';

export default class StudentAdd extends Component{
    @service studentData;
    @service router;
    @service flashMessages;
    @tracked newStudent={
        id:this.studentData.students.length+1,
        name:"",
        rollno:"",
        dob:"",
        dept:"CSE",
        interests:"",
        address:"",
        result:{
          grade:"A+",
          CGPA:"",
          attendance:"",
          backlogs:""
        }
    }
    @tracked departments=["CSE","CSE-AI","ECE","CIVIL","MECH","EEE"]
    @tracked grades=["A+","A","B+","B","C","D","E"]
    @tracked Interests = [
        // Sports
        {groupName:'Sports', options:[ 'Cricket', 'Football', 'Basketball', 'Volleyball', 'Badminton',
        'Tennis', 'Swimming', 'Athletics', 'Cycling', 'Table Tennis',
        'Chess', 'Carrom', 'Kabaddi', 'Hockey', 'Gymnastics']},
        
        
        // Arts & Music
        {groupName:'Arts & Music', options:['Singing', 'Dancing', 'Painting', 'Drawing', 'Photography',
        'Music', 'Playing Instruments', 'Acting', 'Creative Writing', 'Poetry',
        'Crafting', 'Pottery', 'Sculpting', 'Calligraphy', 'Origami']},
        
        // Technology
        {groupName:'Technology',options:['Coding', 'Programming', 'Web Development', 'App Development', 'AI/ML',
        'Data Science', 'Robotics', 'Cyber Security', 'Game Development', 'IoT',
        'Blockchain', 'Cloud Computing', 'UI/UX Design', '3D Modeling', 'VR/AR']},
        
        // Academics
        {groupName:'Academics',options:['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Astronomy',
        'Economics', 'Psychology', 'Philosophy', 'History', 'Literature',
        'Debate', 'Public Speaking', 'Research', 'Quiz', 'Creative Problem Solving']},
        
        // Outdoor Activities
        {groupName:'Activities',
          options:[
            {groupName:'Outdoor Activities',options:['Trekking', 'Camping', 'Hiking', 'Mountaineering', 'Bird Watching',
              'Gardening', 'Fishing', 'Adventure Sports', 'Travel', 'Exploring Nature']},
            {groupName:'Indoor Activities',options:['Reading', 'Writing', 'Blogging', 'Journaling', 'Puzzles',
              'Board Games', 'Video Games', 'Watching Movies', 'Cooking', 'Baking',
              'Meditation', 'Yoga', 'DIY Projects', 'Collecting', 'Learning Languages']}
          ],
        },
  
        // Social Causes
        {groupName:'Social Causes',options:['Volunteering', 'Social Work', 'Environment Conservation', 'Teaching',
        'Animal Welfare', 'Community Service', 'Human Rights', 'Fundraising']},
        
        
        // Miscellaneous
        {groupName:'Miscellaneous',options:['Fashion', 'Modeling', 'Stand-up Comedy', 'Magic Tricks', 'Astrology',
        'Graphic Design', 'Animation', 'Film Making', 'Podcasting', 'YouTubing',
        'Entrepreneurship', 'Stock Market', 'Carpentry', 'Metalworking', 'Electronics']}
    ];

    @action
    updateDepartment(selectedDept) {
      this.newStudent = {
        ...this.newStudent,
        dept: selectedDept, 
      };
    }

    @action
    updateStudent(attr,event){
        this.newStudent={
            ...this.newStudent,
            [attr]:event.target.value
        }
    }

    @action
    updateInterest(selectedInterest){
      this.newStudent={
        ...this.newStudent,
        interests:selectedInterest
      }
    }

    @action
    updateGrade(selectedGrade){
      this.newStudent={
        ...this.newStudent,
        result:{
          ...this.newStudent.result,
          grade:selectedGrade
        }
      }
    }

    @action
    updateResult(attr,event){
      this.newStudent={
        ...this.newStudent,
        result:{
          ...this.newStudent.result,
          [attr]:event.target.value
        }
      }
    }

    @action
    addStudent(e){
        e.preventDefault();
        this.studentData.students=[
            ...this.studentData.students,
            {
                ...this.newStudent
            }
        ]
        console.log(this.studentData.students);
        this.newStudent={
            id:this.studentData.students.length+1,
            name:"",
            rollno:"",
            dept:"",
            interests:"",
            dob:"",
            address:"",
            result:{
              grade:"A+",
              CGPA:"",
              attendance:"",
              backlogs:""
            }
        }

        this.router.transitionTo('student');
        this.flashMessages.success("Successfully Added")
    }

    @action
    student(){
        this.router.transitionTo('student');
        this.flashMessages.warning('You Canceled');
    }
}