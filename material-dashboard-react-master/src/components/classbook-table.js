
import React from 'react';
import ReactDataGrid from "react-data-grid";
import Container from '@material-ui/core/Container';


export default class ClassbookTable extends React.Component{

        constructor(props){

            //classType, forAttendance
            super(props)
            this.state = {
                classbook: this.props.classbook
            }
        }


        shortenType(type){
            if( type === "LABORATORY"){
                return "Lab"
            }
            return "Sem"
        }



        updateAttendance(row, typeKey, typeVal){

            const numberKey = parseInt(typeKey.split(' ')[1])

            if(typeVal === "P" || typeVal === "PRESENT" || typeVal === "1" || typeVal === "PREZENT"){
                if(!(typeKey in this.rows)){
                    this.props.updateRows(row, numberKey, 'CREATE');
                }
            }
            else{
                if(typeVal === "" || typeVal === "X" || typeVal.trim() === ""){
                    this.props.updateRows(row,  numberKey, 'DELETE');
                }
            }
            
        }

        updateGrades(row, typeKey, typeVal){
            const numberKey = parseInt(typeKey.split(' ')[1])
            const parsedVal = parseInt(typeVal)
            //caz aici
            if(typeVal === "" || typeVal === "X" || typeVal.trim() === ""){
                this.props.updateRows(row,  numberKey, 0,  'DELETE');
                return;
            }
            if(!parsedVal || parsedVal < 1 || parsedVal > 10){
                return;
            }
            if(!(typeKey in this.rows)){
                this.props.updateRows(row, numberKey, parsedVal, 'CREATE');
            }
            else{
                this.props.updateRows(row, numberKey, parsedVal, 'PUT')
            }

            
        }

        componentWillReceiveProps(newProps){
            this.state.classbook = newProps.classbook
        }



        updateRows = ({ fromRow, toRow, updated }) => {

            console.log("Updating from", fromRow , toRow, updated)
    
            const typeKey = Object.keys(updated)[0];
            const typeVal = updated[typeKey].toUpperCase();

            if(this.props.forAttendance){
                this.updateAttendance(fromRow, typeKey, typeVal)
            }
            this.updateGrades(fromRow, typeKey, typeVal)
    
        };

        mapColumns(){
            let cols = [ { key: "name", name: "Student Name", editable: false } ];
        
            for(let i = 1; i <= this.state.classbook.classFrequency; i++){
                const val = this.shortenType(this.props.classType) + " " + i;
                const newCol = {key: val, name: val, editable: true};
                cols.push(newCol);
            }
            return cols;
        }

        mapRows(){
            const rows = []
            const students = this.state.classbook.students;
            students.forEach( (studInfo, index) => {
                const stud = studInfo.student;
                const studRow = { name: stud.lastName + " " + stud.firstName };
                const entries = studInfo.entries;
                entries.forEach(entry => {
                    console.log("Entry", entry)
                    const newCellKey = this.shortenType(this.props.classType) + " " + entry['classNumber'];
                    let newCellValue;
                    if(this.props.forAttendance){
                        newCellValue = "Present";
                    }
                    else{
                        if(entry.grade === 0){
                            newCellValue = "-";
                        }
                        else{
                            newCellValue = entry.grade;
                        }
                    };
                    studRow[newCellKey] = newCellValue;
                });
                rows.push(studRow)
            });
            return rows;
        }

        render(){

            this.cols = this.mapColumns();
            this.rows = this.mapRows();
        
           return (<ReactDataGrid
            columns = {this.cols}
            rowGetter={i => this.rows[i]}
            rowsCount={this.rows.length}
            onGridRowsUpdated={this.updateRows.bind(this)}
            enableCellSelect={this.props.editable}
            />);
        }
}
