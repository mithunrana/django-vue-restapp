const employee = {
    template: `
    <div>
        <button type="button" class="btn btn-primary m-2 fload-end" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="addClick()">
        Add Employee
        </button>
        <table class="table table-striped">
        <thead>
            <tr>
                <th>
                    Employee Id
                </th>
                <th>
                    Employee Name
                </th>
                <th>
                    Department
                </th>
                <th>
                    DOJ
                </th>
                <th>
                    Options
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="emp in employees">
                <td>{{emp.EmployeeID}}</td>
                <td>{{emp.EmployeeName}}</td>
                <td>{{emp.Department}}</td>
                <td>{{emp.DateOfJoining}}</td>
                <td>
                    <button type="button"
                    class="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="editClick(emp)">
                     EDIT
                    </button>
                    <button type="button" @click="deleteClick(emp.EmployeeID)"
                    class="btn btn-light mr-1">
                        DELETE
                    </button>

                </td>
            </tr>
        </tbody>
        </thead>
        </table>


        
    <div class="modal fade" id="exampleModal" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>

        <div class="modal-body">
        <div class="d-flex flex-row bd-highlight mb-3">
            <div class="p-2 w-50 bd-highlight">
                <div class="input-group mb-3">
                    <span class="input-group-text">Name</span>
                    <input type="text" class="form-control" v-model="EmployeeName">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Department</span>
                    <select class="form-select" v-model="Department">
                        <option v-for="dep in departments">
                        {{dep.DepartmentName}}
                        </option>
                    </select>
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">DOJ</span>
                    <input type="date" class="form-control" v-model="DateOfJoining">
                </div>

            </div>
            <div class="p-2 w-50 bd-highlight">
                <img width="250px" height="250px"
                    :src="PhotoPath+'/'+PhotoFileName"/>
                <input class="m-2" type="file" @change="imageUpload">
            </div>
        </div>
            <button type="button" @click="createClick()"
            v-if="EmployeeID==0" class="btn btn-primary">
            Create
            </button>
            <button type="button" @click="updateClick()"
            v-if="EmployeeID!=0" class="btn btn-primary">
            Update
            </button>
        </div>
        </div>
        </div>
     </div>

    </div>
    `,
    data(){
    return{
        departments:[],
        employees:[],
        modalTitle:"",
        EmployeeID:0,
        EmployeeName:"",
        Department:"",
        DateOfJoining:"",
        PhotoFileName:"anonymous.png",
        PhotoPath:variables.PHOTO_URL
    }
    },
    methods: {
        refreshData(){
        axios.get(variables.API_URL+"employee")
        .then((response)=>{
            this.employees=response.data;
        });

        axios.get(variables.API_URL+"department")
        .then((response)=>{
            this.departments=response.data;
        });
    },
    addClick(){
        this.modalTitle="Add Employee";
        this.EmployeeID=0;
        this.EmployeeName="";
        this.Department="",
        this.DateOfJoining="",
        this.PhotoFileName="anonymous.png"
    },
    editClick(emp){
        this.modalTitle="Edit Employee";
        this.EmployeeID=emp.EmployeeID;
        this.EmployeeName=emp.EmployeeName;
        this.Department=emp.Department,
        this.DateOfJoining=emp.DateOfJoining,
        this.PhotoFileName=emp.PhotoFileName
    },
    createClick(){
        axios.post(variables.API_URL+"employee",{
            EmployeeName:this.EmployeeName,
            Department:this.Department,
            DateOfJoining:this.DateOfJoining,
            PhotoFileName:this.PhotoFileName
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    updateClick(){
        axios.put(variables.API_URL+"employee",{
            EmployeeID:this.EmployeeID,
            EmployeeName:this.EmployeeName,
            Department:this.Department,
            DateOfJoining:this.DateOfJoining,
            PhotoFileName:this.PhotoFileName
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
        }
        axios.delete(variables.API_URL+"employee/"+id)
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });

    },
    imageUpload(event){
        let formData=new FormData();
        formData.append('file',event.target.files[0]);
        axios.post(
            variables.API_URL+"employee/savefile",
            formData)
            .then((response)=>{
                this.PhotoFileName=response.data;
            });
    }
    },
   mounted:function(){
    this.refreshData();
   }
}