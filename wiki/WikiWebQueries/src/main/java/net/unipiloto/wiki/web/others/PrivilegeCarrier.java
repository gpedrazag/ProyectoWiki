package net.unipiloto.wiki.web.others;

public class PrivilegeCarrier
{
    private boolean query;
    private boolean insert;
    private boolean update;
    private boolean delete;
    private boolean admin;

    public boolean isQuery()
    {
        return query;
    }

    public void setQuery(boolean query)
    {
        this.query = query;
    }

    public boolean isInsert()
    {
        return insert;
    }

    public void setInsert(boolean insert)
    {
        this.insert = insert;
    }

    public boolean isUpdate()
    {
        return update;
    }

    public void setUpdate(boolean update)
    {
        this.update = update;
    }

    public boolean isDelete()
    {
        return delete;
    }

    public void setDelete(boolean delete)
    {
        this.delete = delete;
    }

    public boolean isAdmin()
    {
        return admin;
    }

    public void setAdmin(boolean admin)
    {
        this.admin = admin;
    }
    
    
}
