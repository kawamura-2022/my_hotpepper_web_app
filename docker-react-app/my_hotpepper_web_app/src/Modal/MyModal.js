import React from 'react';
import Modal from 'react-modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };  

// 詳細画面に表示したい情報のkey値
const showList = ['name', 'address', 'open', 'close', 'thumbnail'];
const showList_text = ['店舗名　', '住所　　', '営業時間', '定休日　', '店舗画像'];

const MyModal = ( props ) => {
    console.log('start Modal render')    
    console.log('input props.modalIsOpen -> ' + props.modalIsOpen)

    const detail_vals = showList.map( function( value ) {
        //配列のキーワードを使ってオブジェクト内の値を取得する
        console.log('value -> '+ value)
        if ( value === 'thumbnail'){
            return  '<img src='+this[value]+' alt=\'no thumbnail\'>';
        } else {
            return '<td>'+this[value]+'</td>';
        }

        // return this[value];
    }, props.rowData );
    console.log(detail_vals)
    
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(props.modalIsOpen);
    
    // function openModal() {
    //     setIsOpen(true);
    // }

    function afterOpenModal() {        
        subtitle.style.color = '#3ab60b';        
    }

    function closeModal(){
        setIsOpen(false);
    }

    console.log('modalIsOpen -> ' + modalIsOpen)

    function str2html (input_str) {
        console.log('input str -> ' + input_str)
        return(
            <span dangerouslySetInnerHTML={{__html: input_str}}></span>
        );
    }

    function renderDetailComponent ( showList_text, detail_vals) {        
        return (        
            <div>
                {
                detail_vals.map((det_val,index) =>
                    <tr key={det_val}>
                      <td>
                        {showList_text[index]}　：
                      </td>
                      
                      {str2html(det_val)}                      
                    </tr>
                )
                }
            <br></br>
            </div>    
        );    
    }

    return (    
        <div>
        {/* <Button variant="success" className="mr-2" onClick={openModal}>モーダル表示</Button> */}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

            <h2 ref={_subtitle => (subtitle = _subtitle)}>店舗詳細</h2>          
            {renderDetailComponent( showList_text, detail_vals)}
            
            <Button variant="success" className="mr-2" onClick={closeModal}>close</Button>          
        </Modal>
      </div>
    );
}
export default MyModal;