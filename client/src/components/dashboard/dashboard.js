import React ,{useEffect,useContext}from 'react'
import {context} from '../../contexts/context'
import RegisterBox from './Box/registerBox'
import AuthorList from './authorlist/authorlist'
import './dashboard.css'

const Dashboard = ()=>{

    const {loginToken} = useContext(context)
    const authorProps={
        buttonText:"Author",
         dropdown:["language","genre"],
         textBoxLabels:["name","description"],
         dropdownLabels:["Select Language","Select Genre"],
         numberBoxLabels:[],
        textBox:"2",
         numberBox:"0",
        text:"Add Author" ,
        bg:"#568c91"

    }

    const genreProps={
        buttonText:"Genre",
        textBoxLabels:["name"],
         dropdownLabels:[],
         numberBoxLabels:[],
         dropdown:[],
        textBox:"1",
         numberBox:"0",
        text:"Add Genre" ,
        bg:"#f5a60a"

    }
    const publisherProps={
        buttonText:"Publisher",
        textBoxLabels:["name","description"],
         dropdownLabels:[],
         numberBoxLabels:[],
         dropdown:[],
        textBox:"2",
         numberBox:"0",
        text:"Add Publisher" ,
        bg:"#91566c"

    }
    const bookProps={
        buttonText:"Book",
        textBoxLabels:["name","isbn","description","availability"],
         dropdownLabels:["Select Language","Select Genre","Select Author"],
         numberBoxLabels:["price","page"],
         dropdown:["language","genre","author"],
        textBox:"4",
         numberBox:"2",
        text:"Add Book" ,
        bg:"#396b2b"

    }
    const languageProps={
        buttonText:"Language",
        textBoxLabels:["name"],
         dropdownLabels:[],
         numberBoxLabels:[],
         dropdown:[],
        textBox:"1",
         numberBox:"0",
        text:"Add Language" ,
        bg:"#631010"

    }


    return(<div>

        {loginToken?
                <>
                <div className="register-box-flex" >


                <RegisterBox 
                
                textBoxLabels={authorProps.textBoxLabels}
                numberBoxLabels={authorProps.numberBoxLabels}
                dropdownLabels={authorProps.dropdownLabels}
                buttonText={authorProps.buttonText} dropdown={authorProps.dropdown} textBox={authorProps.textBox} text={authorProps.text} bg={authorProps.bg} numberBox={authorProps.numberBox} />
                
                <RegisterBox 
                textBoxLabels={bookProps.textBoxLabels}
                numberBoxLabels={bookProps.numberBoxLabels}
                dropdownLabels={bookProps.dropdownLabels}
                
                buttonText={bookProps.buttonText}
                dropdown={bookProps.dropdown}
                 textBox={bookProps.textBox}
                 bg={bookProps.bg} text={bookProps.text} 
                 numberBox ={bookProps.numberBox} />

                <RegisterBox
                textBoxLabels={genreProps.textBoxLabels}
                 numberBoxLabels={genreProps.numberBoxLabels}
                 dropdown={genreProps.dropdown}
                 dropdownLabels={genreProps.dropdownLabels}
                buttonText={genreProps.buttonText} textBox={genreProps.textBox} 
                bg={genreProps.bg} 
                text={genreProps.text}  
                numberBox={genreProps.numberBox} />

                <RegisterBox
                                textBoxLabels={languageProps.textBoxLabels}
                                numberBoxLabels={languageProps.numberBoxLabels}
                                dropdownLabels={languageProps.dropdownLabels}
                                dropdown={languageProps.dropdown}
                buttonText={languageProps.buttonText} textBox={languageProps.textBox} bg={languageProps.bg} text={languageProps.text} numberBox ={languageProps.numberBox} />

                <RegisterBox

                                textBoxLabels={publisherProps.textBoxLabels}
                                numberBoxLabels={publisherProps.numberBoxLabels}
                                dropdownLabels={publisherProps.dropdownLabels}
                                dropdown={publisherProps.dropdown}
                                buttonText={publisherProps.buttonText}
                                textBox={publisherProps.textBox} bg={publisherProps.bg}
                                text={publisherProps.text} numberBox={publisherProps.numberBox} />

           
    
            </div>
            <AuthorList/>
            </>
            


        :null}
    </div>)
}

export default Dashboard;
