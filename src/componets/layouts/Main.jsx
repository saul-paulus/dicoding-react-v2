import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import { getAllNotes, isArchiveNote,deleteNote, addNote} from '@/utils/local-data';
import Beranda from '@/pages/Beranda';
import Arsip from '@/pages/Arsip';
import DetailPage from '@/pages/DetailPage';
import Tambah from '@/pages/Tambah';
import parser from 'html-react-parser';
import NotPages from '@/pages/NotPages';

class Main extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            notes: getAllNotes(),
            titleBrand:"myNote",
            title:"",
            body:"",
            keyboard:""
        }
        this.onArchivedHandler = this.onArchivedHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
        this.onKeyboardChangeHandler = this.onKeyboardChangeHandler.bind(this);
    }

    onArchivedHandler(id) {
        isArchiveNote(id);
        this.setState({
            notes: getAllNotes()
        },()=>{
            window.history.back();
        })
    }

    onDeleteHandler(id){
        deleteNote(id);
        this.setState({
            notes: getAllNotes()
        }, ()=>{
            window.history.back();
        })
    }

    onTitleChangeHandler(e){
        this.setState({title: e.target.value})
    }
    onBodyChangeHandler(e) {
        const content = e.target.innerHTML; 
        this.setState({
            body: parser(content),
        });
    }

    onAddNoteHandler(e){
        e.preventDefault();
        const {title, body} = this.state;

        addNote({title,body});
        this.setState({
            notes:getAllNotes(),
            title:""
        },()=>{
            window.history.back();
        })
    }

    onKeyboardChangeHandler(e){
        const keyVal = e.target.value;
        this.setState(()=>{
            return {
                keyboard: keyVal
            }
        })     
    }

    render(){
        return(
            <> 
                <header>
                    <Navbar titleBrand={this.state.titleBrand}/>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Beranda notes={this.state.notes} keyboard={this.state.keyboard} onKeyboardChange={this.onKeyboardChangeHandler} />}/>
                        <Route path="/note/tambah" element={<Tambah onAddNote={this.onAddNoteHandler} title={this.state.title} onTitleChange={this.onTitleChangeHandler} onBodyChange={this.onBodyChangeHandler} />}/>
                        <Route path="/note/idNote/:id" element={<DetailPage onArchived={this.onArchivedHandler} onDelete={this.onDeleteHandler}  />}/>
                        <Route path="/note/arsip" element={<Arsip notes={this.state.notes} keyboard={this.state.keyboard} onKeyboardChange={this.onKeyboardChangeHandler} />}/>
                        <Route path="*" element={<NotPages/>} />
                    </Routes>
                </main>
            </>

        );
    }
}

export default Main;