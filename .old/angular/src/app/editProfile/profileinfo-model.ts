export interface Profile {
    avatar: any,
    tags: Tag[];
    birth_date: string;
    email: string;
    preferences: Preference;
}

export interface Tag {
    id: number,
    title: string;
}


export interface Preference {
    alcohol: number;
    food: number;
    email_notifications: number;
}




  export function createProfile(avatar?,tags?: Tag[], birth_date?: string, email?: string, preferences?: Preference[]): Profile {
    return {
      avatar,
      tags: [createTag()],
      birth_date,
      email,
      preferences: createPreference(),
    }
  }
  
  
  export function createTag(id?:number, title?: string): Tag {
      return {
          id,
          title
      }
  }
  
  
  export function createPreference(alcohol?: number, food?: number, email_notifications?: number): Preference {
      return {
          alcohol,
          food,
          email_notifications
      }
  }