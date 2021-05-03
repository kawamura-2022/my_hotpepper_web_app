import React from "react";
import MaterialTable from 'material-table'

class StoreDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isModal : false,            
            columns: [
                { title: '店舗名称', field: 'name' },
                { title: 'アクセス', field: 'access' },
                { title: 'images', field: 'thumbnail' },  
              ],
        }
    }
    
    toggleModal () {
        this.setState({
            isModal: !this.state.isModal
        });
    }

    convChild2Data ( children ) {
        const extracted_data = [];
        children.forEach(elm_origin => {
            let my_obj_data = {};
            if (elm_origin.name !== "shop") {            
                if (process.env.REACT_APP_VERBOSE) {
                    console.log('skip element -> ' + JSON.stringify(elm_origin))
                }
            }else {
                let tgt_children =  elm_origin.children;
                tgt_children.forEach(elm => {
                    if (elm.name === 'name') {
                        my_obj_data['name'] = elm.value;
                    } else if (elm.name === 'access') {
                        my_obj_data['access'] = elm.value;
                    } else if (elm.name === 'photo') {
                        console.log(elm.photo)
                        // childre の要素の48番目
                        // my_obj_data['thumbnail'] = elm.photo.children.pc.children.s;
                        my_obj_data['thumbnail'] = 'dummy';
                    } else if (elm.name === 'lat') {
                        my_obj_data['test'] = 'dummy';
                    }
                })                
                extracted_data.push(my_obj_data)
            }
        });

        if (process.env.REACT_APP_VERBOSE) {
            console.log('-------\nextracted_data -> ' + extracted_data + '\n-------')            
        }        
        return extracted_data;
    }

    showDetailModal (  ) {
        console.log("showDetailModal")
        return (
            <div id="overlay">
              <div id="content">
                <p>これがモーダルウィンドウです。</p>
                <p><button>close</button></p>
              </div>
            </div>
        )
    }

    SimpleActionTable ( colimns, children ) {
        console.log("called SimpleActionTable")        
        const extracted_data = this.convChild2Data(children);                
        
        return (
          <MaterialTable
            title="検索結果"
            columns={colimns}
            data={extracted_data}        
            actions={[
              {
                icon: 'library_add',
                tooltip: 'Shoe Store Detail',
                onClick: (event, rowData) => {
                    alert("rowData -> " + JSON.stringify(rowData))
                }
              }
            ]}
          />
        )
      }
    
    render () {        
        return (
            <div>                   
                <br></br>
                {this.SimpleActionTable(this.state.columns, this.props.children)}
            </div>                  
        )
    }
}

export default StoreDetail;