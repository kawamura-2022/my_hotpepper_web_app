import React from "react";

const style = {
    padding: "px",
    "margin-bottom": 10,
    border: "5px double #333333",
};

class StaticExplain extends React.Component {
    render () {        

        return (
            <div class="row">
                <div class="col-md-6 col-md-offset-3" style={style}>            
                    このサイトでは，現在地付近の飲食店を探す事ができます．<br></br>
                    現在地を取得するボタンをクリックし，検索条件を設定すれば，<font color="#FF97C2">会員登録なし</font>て使用できます．                
                </div>
            </div>            
        );
    }
}
export default StaticExplain;