const department = {
    template:
    `<div>

    <button type="button" class="btn btn-primary m-2 fload-end" data-bs-toggle="modal" data-bs-target="#exampleModal"
     @click="addClick()"> Add Department </button>

    <table class="table">
        <thead>
            <tr>
            <th scope="col">DepartmentID</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="department in departments">
            <th scope="row">{{department.DepartmentID}}</th>
            <td>{{department.DepartmentName}}</td>
            <td>
                <span>
                    <button type="button" @click="editClick(department)" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        EKDI
                    </button>
                    <button class="btn btn-danger" @click="deleteClick(department.DepartmentID)">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </span>
            </td>
            </tr>
        </tbody>
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

                <div class="input-group mb-3">
                    <span class="input-group-text">Department Name</span>
                    <input type="text" class="form-control" v-model="DepartmentName">
                </div>

                <button type="button" @click="createClick()"
                v-if="DepartmentID==0" class="btn btn-primary">
                Create
                </button>
                <button type="button" @click="updateClick()"
                v-if="DepartmentID!=0" class="btn btn-primary">
                Update
                </button>

            </div>

        </div>
        </div>
        </div>
    
        </div>
        `,
    data(){
        return {
            departments: [],
            modalTitle:"",
            DepartmentName:"",
            DepartmentID:0,
            DepartmentNameFilter:"",
            DepartmentIdFilter:"",
            departmentsWithoutFilter:[]
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + 'department')
                .then((response) => {
                    this.departments = response.data;
            })
        },
        
        addClick() {
        this.modalTitle="Add Department";
        this.DepartmentID=0;
        this.DepartmentName="";
        },

        createClick(){
            axios.post(variables.API_URL+"department",{
                DepartmentName:this.DepartmentName
            })
            .then((response)=>{
                this.refreshData();
                alert(response.data);
            });
        },

        editClick(dep){
            this.modalTitle="Edit Department";
            this.DepartmentID=dep.DepartmentID;
            this.DepartmentName=dep.DepartmentName;
        },

        updateClick(){
            axios.put(variables.API_URL+"department",{
                DepartmentID:this.DepartmentID,
                DepartmentName:this.DepartmentName
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
            axios.delete(variables.API_URL+"department/"+id)
            .then((response)=>{
                this.refreshData();
                alert(response.data);
            });
        }
    },
    
    mounted: function () {
        this.refreshData();
    }
}
