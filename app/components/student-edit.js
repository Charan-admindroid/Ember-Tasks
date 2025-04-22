/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

export default class StudentEdit extends Component{
    @service studentData;
    @service router;
    @service flashMessages;
    @tracked editStudent={
        ...this.args.student
    }
    @tracked grades=["A+","A","B+","B","C","D","E"]
    @tracked departments=["CSE","CSE-AI","ECE","CIVIL","MECH","EEE"]
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
        this.editStudent = {
        ...this.editStudent,
        dept: selectedDept, 
        };
    }

    @action
    updateStudent(attr,event){
        this.editStudent={
            ...this.editStudent,
            [attr]:event.target.value
        }
    }

    @action
    updateGrade(selectedGrade){
      this.editStudent={
        ...this.editStudent,
        result:{
          ...this.editStudent.result,
          grade:selectedGrade
        }
      }
    }

    @action
    updateResult(attr,event){
      this.editStudent={
        ...this.editStudent,
        result:{
          ...this.editStudent.result,
          [attr]:event.target.value
        }
      }
    }

    @action
    updateInterest(selectedInterest){
      this.editStudent={
        ...this.editStudent,
        interests:selectedInterest
      }
    }

    @action
    saveChanges(e){
        e.preventDefault();
        this.studentData.students=this.studentData.students.map((student)=>student.id===this.editStudent.id?this.editStudent:student);
        console.log(this.studentData.students);
        this.router.transitionTo('student');
        this.flashMessages.success('Saved Successfully');
    }

    @action
    student(){
        this.router.transitionTo('student');
        this.flashMessages.danger('You Canceled')
    }

}