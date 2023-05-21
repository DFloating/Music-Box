# :musical_note: Music-Box :loud_sound:
featuring JordyJord, Genie-theCoolKat, Josh the unnamed & Dfloaty

## Instructions

In the terminal, run
```
git clone https://github.com/DFloating/Music-Box.git
```
cd into the folder, then run:
```
npm install
npm run dev
```
Open your browser and type url https://localhost:5173/ (or whichever local server specified on your terminal)



## How to Use this Music Box?

* Upload your songs on the Music Upload tab! 

![Alt Text](public/musicupload.jpg)
* Click choose file, then select the music file that you wish to upload
* Make sure to enter all details, with the correct capitalisation and spaces. 
* Once done, click on the submit song button to upload your file 
* For uploading multiple songs, please refresh the page before attempting to upload the next song. 

* View all your uploaded songs in the Show All Music List.
* Search for songs, and Play, Pause and Stop songs directly from the list!


More features coming soon.

Please submit all bugs or any issues to **josh@gmail.com** with screenshots if possible, and we will look into it!

## :stopwatch: Timeline :stopwatch:

Friday 12/5/23 - Went ahead with idea of Music API app

Tuesday 16/5/23 - Decision made to use supabase database for the player

Friday 19/5/23 - Final tweaks before demo


## Hurdles & Challenges :mute:

* Attempted to incorporate both Spotify and Soundcloud APIs over the weekend, but had issues with obtaining music tracks to play and OAuth respectively
* Conflicts during push/pull which resulted in broken parts and headaches fairly often - lots of constant bug fixing, especially towards submission date when the file was getting bigger with more constantly moving parts
* Having to combine/merge work done separately onto one page/functionality - and getting that to work 

## Side note
* Certain routes remain on the App.jsx page as a preview of what it was like during the course of development, but not displayed on the nav bar in the final product. 
* The WaveFormTest component page still functions. However, the MusicPlayer does not, but previously did. The plan was to combine WaveFormTest's and MusicPlayer's features all in one, and continue developing features from there onwards. However, that plan was put aside. 


