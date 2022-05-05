export const courseList = [
  {
    id: 1,
    title: 'Greeting and introducing',
    children: [
      {
        parentId: 1,
        id: 1,
        title: 'Meeting for the First Time',
        children: [
          {
            user: 1,
            title: 'Good afternoon, Mr.Lee! I’m Liu Jun from Beijing Construction Company. I，m manager in charge of the project. Nice to meet you!'
          },
          {
            user: 2,
            title: 'Hi, good afternoon, Mr.Liu! Nice to meet you! I have heard that your project is fantastic! When will the project be finished?'
          },
          {
            user: 1,
            title: 'I t will be finished in the middle of June.'
          },
          {
            user: 2,
            title: 'Cheers!'
          }
        ]
      },
      {
        parentId: 1,
        id: 2,
        title: 'Talking About a Metro Project',
        children: [
          {
            user: 1,
            title: 'Good morning, Mr.Black! How’s everything going?'
          },
          {
            user: 2,
            title: 'Good morning, Mr.White! It’s OK, thanks!'
          },
          {
            user: 1,
            title: 'How about the project you told me last time? Is it going well?'
          },
          {
            user: 2,
            title: 'Yeah, actually, it’s going very smooth. We’ll build a Metro line in the southern part of Hefei City.'
          },
          {
            user: 1,
            title: 'That’s great! Congratulations on your great job!'
          }
        ]
      },
      {
        parentId: 1,
        id: 3,
        title: 'Asking about Directions',
        children: [
          {
            user: 1,
            title: 'Hi, Sir! Could you tell me from which gate could I enter into the Metro station and reach Educational District in this city?'
          },
          {
            user: 2,
            title: 'Go along this lobby, please. Turn right from the next corner, and you will see the Entrance B.You can arrive at the Educational District station by the Metro there.'
          },
          {
            user: 1,
            title: 'Thank you very much!'
          }
        ]
      },
      {
        parentId: 1,
        id: 4,
        title: 'Asking about Ticket',
        isVoice: true,
        children: [
          {
            user: 1,
            title: 'Hello, what can I do for you?',
            audio: 's1.mp3'
          },
          {
            user: 2,
            title: 'Good morning, Sir. Could I know when is the last train leaving for Shanghai today?',
            audio: 'p1.mp3'
          },
          {
            user: 1,
            title: 'It leaves at 5 p.m. tonight. And you can book a ticket now.',
            audio: 's2.mp3'
          },
          {
            user: 2,
            title: 'Thank you very much! Then could I have two tickets for the train leaving at 5p.m.?',
            audio: 'p2.mp3'
          },
          {
            user: 1,
            title: 'Surely.',
            audio: 's3.mp3'
          },
          {
            user: 2,
            title: 'Thanks very much!',
            audio: 'p3.mp3'
          }
        ]
      },
      {
        parentId: 1,
        id: 5,
        title: 'Inquire on Time',
        children: [
          {
            user: 1,
            title: 'Excuse me, Madam. Could you tell me what time is it now?'
          },
          {
            user: 2,
            title: 'Well, it’s half past nine. If you want to take the next train, then you should hurry up.'
          },
          {
            user: 1,
            title: 'Thanks very much!'
          },
          {
            user: 2,
            title: 'You are welcome.'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Asking the way and giving directions'
  },
  {
    id: 3,
    title: 'Names of Basic Metro Facilities'
  },
  {
    id: 4,
    title: 'Ticket Service and Automatic Fare Collection'
  },
  {
    id: 5,
    title: 'Platform Service'
  },
  {
    id: 6,
    title: 'Broadcasting'
  },
  {
    id: 7,
    title: 'Security Check'
  },
  {
    id: 8,
    title: 'Emergency and First Aid'
  },
  {
    id: 9,
    title: 'Coping with Great Passenger Flows'
  },
  {
    id: 10,
    title: 'Dealing with Complaints'
  },
  {
    id: 11,
    title: 'Dealing with Lost'
  },
  {
    id: 12,
    title: 'Operating in Bad Weather'
  }
]