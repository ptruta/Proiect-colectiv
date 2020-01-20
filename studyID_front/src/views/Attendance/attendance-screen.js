import React from "react";
import ReactDataGrid from "react-data-grid";
import Container from '@material-ui/core/Container';
import classbookService from "services/classbook-service";
import ClassbookTable from 'components/classbook-table';

export default class AttendanceSheet extends React.Component {

    constructor(props){
        super(props)
        console.log("STATE  ", this.props.location.state)
        this.state = { 
        
            subjectId: this.props.location.state.subjectId,
            professorId: this.props.location.state.professorId,
            formation: this.props.location.state.formation,
            classType: this.props.location.state.classType,
            classbook : undefined

        };
    }

    async componentDidMount(){
        const classbook = await classbookService.getClassBook(this.state.classType, this.state.formation, this.state.subjectId);
        this.setState({
            classbook: classbook
        })
        
    }
    
    async updateAttendanceRows(rowId, number, typeOfUpdate){
        const studentInfo = this.state.classbook.students[rowId];
        const classbookCopy = JSON.parse(JSON.stringify(this.state.classbook));
        if(typeOfUpdate === 'CREATE'){
            const newPresence = await classbookService.markPresent(number, this.state.classType, studentInfo.student.id, this.state.subjectId);
            classbookCopy.students[rowId].entries.push(newPresence);
            this.setState({
                classbook : classbookCopy
            })
        }
        else{
            const entry = studentInfo.entries.filter(entry => entry.classNumber === number)[0];
            if(!entry){
                return;
            }
            await classbookService.markAbsent(entry.id);
            classbookCopy.students[rowId].entries = studentInfo.entries.filter(entry => entry.classNumber !== number)
            this.setState({
                classbook: classbookCopy
            })

        }
    }

    async updateGradesRows(rowId, number, newGrade, typeOfUpdate){
        const studentInfo = this.state.classbook.students[rowId];
        const classbookCopy = JSON.parse(JSON.stringify(this.state.classbook));

        if(typeOfUpdate === 'CREATE'){
            const newPresence = await classbookService.createGrade(number, this.state.classType, studentInfo.student.id, this.state.subjectId, newGrade);
            classbookCopy.students[rowId].entries.push(newPresence);
            this.setState({
                classbook : classbookCopy
            })
        }
        else{
            if(typeOfUpdate == 'DELETE'){
                const entry = studentInfo.entries.filter(entry => entry.classNumber === number)[0];
                if(!entry){
                    return;
                }
                await classbookService.deleteGrade(entry.id);
                classbookCopy.students[rowId].entries.forEach( entry => {
                    if(entry.classNumber === number){
                        entry.grade = newGrade
                    }
                });
                this.setState({
                    classbook: classbookCopy
                })
            }
        }
    }

    render() {

        if(this.state.classbook === undefined){
            return "Loading"
        }

        return (
            <Container maxWidth="l">
                {/* <ReactDataGrid
                    columns = {columns}
                    rowGetter={i => this.state.rows_attendance[i]}
                    rowsCount={this.state.rows_attendance.length}
                    onGridRowsUpdated={this.onGridRowsUpdatedAttendance}
                    enableCellSelect={false}
                />

                <ReactDataGrid
                    columns = {columns}
                    rowGetter={i => this.state.rows_grades[i]}
                    rowsCount={this.state.rows_grades.length}
                    onGridRowsUpdated={this.onGridRowsUpdatedGrades}
                    enableCellSelect={true}
                /> */}
                <ClassbookTable editable={true} forAttendance={true} classbook={this.state.classbook} updateRows={this.updateAttendanceRows.bind(this)} classType={this.state.classType} />
                <br/><br/>
                <ClassbookTable editable={true} forAttendance={false} classbook={this.state.classbook} updateRows={this.updateGradesRows.bind(this)} classType={this.state.classType} />

            </Container>
        );
    }
}
