import ClassbookTable from 'components/classbook-table.js';

export default class StudentAttendance extends React.Component {
    render() {
        if (this.props.classbook === undefined) {
            return null;
        } 
        return (
            <ClassbookTable>
                
            </ClassbookTable>
        )
    }
}