import os
from pydoc import source_synopsis
import bs4

def clean_html(path):
    with open(path,"r",encoding="utf8") as file:
        soup = bs4.BeautifulSoup(file.read(),"html5lib")
        content = soup.select_one('.theme-default-content.content__default')
        _title = content.find("h1")
        title = _title.text
        _title.decompose()
        
        _songbook_details = content.find('em')
        if _songbook_details is not None:
            songbook_details = f"*{_songbook_details.text}*  \n\n"
            _songbook_details.decompose()
        else:
            songbook_details = ""
                    
        
        music = ""
        _music = content.find_all('audio')
        for element in _music:
            music_el = soup.new_tag("audio",attrs={"class":"music","controls":"","preload":"none"})
            music_el.extend(element)
            if "transp" in music_el.contents[0].get("src"):
                desc = "__Едноглас__"
            else:
                desc = "__Мелодия__"
            music += desc + "  \n" + str(music_el) + "  \n\n"
            element.decompose()
            
        
        _sheet_music = content.find("img")
        if _sheet_music is not None:
            sheet_music = "__Ноти__  \n" + str(_sheet_music) + "\n"
            _sheet_music.decompose()
        else:
            sheet_music = ""
        
        melodia_ednoglas_remove = content.select("p strong")
        for el in melodia_ednoglas_remove:
            el.decompose()
            
        _bible_ref = content.select_one("a")
        if _bible_ref is not None:
            bible_ref = f"[{_bible_ref.text.replace('(opens new window)','')}]({_bible_ref.attrs['href']})  \n\n"
            _bible_ref.decompose()
        else: bible_ref = ""

        
        lyrics = ""
        ordered_list = content.select_one("ol")
        if ordered_list is not None:
            idx = 1
            for idx,li in enumerate(filter(lambda x: x.text!=" ", ordered_list.children),start=1):
                lyrics += str(idx) + ". " + li.text.replace("\n","  \n") + '  \n\n'
        else:
            for paragraph in content.select("p"):
                lyrics += paragraph.text.replace("\n","  \n") + "  \n\n"
            
        
        
        # lyrics = content.text
        
        body = title + "  \n\n" + songbook_details + lyrics + bible_ref + music + sheet_music
        # print(body)
        return body
    
exceptions = ["124.html"]
if __name__ == "__main__":
    print("Processing... ")
    # for _file in exceptions:
    for _file in sorted(os.listdir()):
        if "html" not in _file: continue
        try:
            body = clean_html(_file)
            with open("md/" + _file.rpartition('.')[0]+".md", 'w', encoding="utf8") as md:
                md.write(body)
            print(_file,end=" ")
        except:
            print("Exception happened at file "+_file)
            continue