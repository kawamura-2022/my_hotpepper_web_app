import React from "react";
import MaterialTable from 'material-table';

import MyModal from './Modal/MyModal';

class StoreDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isModal : false,                        
            columns: [
                { title: '店舗名称', field: 'name' },
                { title: 'アクセス', field: 'access' },                
                {
                    title: 'Shop Photo'
                    ,field: 'thumbnail'
                    ,render: rowData => (
                        <img                            
                            // style={{ height: 36, width: '50%' }}  // TODO: originalのサイズが見やすい??比較
                            src={rowData.thumbnail}
                            alt='no thumbnail'
                        />                        
                    ),
                },
              ],
            detailRowData: [],
        }
    }
    
    toggleModal () {
        this.setState({
            isModal: !this.state.isModal,            
        });
    }

    setDetailData ( rowData ) {
        this.setState({
            detailRowData: rowData
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
                        // childre の要素の48番目 
                        // let tgt_img_url = elm.children[0].children[0].value;  // pc の l
                        let tgt_img_url = elm.children[0].children[1].value;  // pc の m
                        // let tgt_img_url = elm.children[0].children[2].value;  // pc の s
                        // let tgt_img_url = elm.children[1].children[0].value;  // mobile の l
                        // let tgt_img_url = elm.children[1].children[0].value;  // mobile の s

                        my_obj_data['thumbnail'] = tgt_img_url;
                        
                        console.log(elm.children[0].children[1].value);                        
                        // my_obj_data['thumbnail'] = 'https://zartnerds.files.wordpress.com/2015/10/thumbnail.png';
                    } else if (elm.name === 'address') {
                        my_obj_data['address'] = elm.value;
                    } else if (elm.name === 'open') {
                        my_obj_data['open'] = elm.value;
                    }　else if (elm.name === 'close') {
                        my_obj_data['close'] = elm.value;
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
                    // alert("rowData -> " + JSON.stringify(rowData))
                    this.toggleModal();                    
                    console.log('toggleModal -> ' + this.state.isModal)
                    this.setDetailData(rowData);
                }
              }
            ]}
          />
        )
      }

    ShowModal () {
        console.log(this.state.isModal)
        return (
            this.state.isModal ? (
                <MyModal modalIsOpen={this.state.isModal} rowData={this.state.detailRowData} />
            ) : (
                <div>
                    not show model                    
                </div>
            )               
        )
    }

    closeModal(){
        this.toggleModal();
    }
    
    render () {        
        return (
            <div>               
                <br></br>
                {this.SimpleActionTable(this.state.columns, this.props.children)}                                
                {this.ShowModal()}                
            </div>                  
        )
    }
}

export default StoreDetail;